import { RequestHandler } from "express";
import { IBody } from "../interfaces";
import { NeededItem, Post } from "../models/postModel";
import { User } from "../models/userModel";
import turf from "@turf/turf";
import fs from "fs";
import path from "path";

interface IPostCreateReqBody extends IBody {
  neededItems: string;

  latitude: string;

  longitude: string;

  description: string;
}

interface IPostFetchReqBody extends IBody {
  latitude: string;
  longitude: string;
}

export const post_create: RequestHandler = async (req, res) => {
  const body = req.body as IPostCreateReqBody;
  let post = new Post();
  post.latitude = body.latitude;
  post.longitude = body.longitude;
  post.description = body.description;

  let _neededItems = (JSON.parse(body.neededItems) as string[]).map((_item) => {
    let neededItem = new NeededItem();
    neededItem.itemName = _item;
    return neededItem;
  });
  post.neededItems = _neededItems;
  const files = req.files as Express.Multer.File[];

  let user = await User.findOne(body.userId);
  if (!user) {
    res.status(500).end();
    return;
  }
  post.postedBy = user;
  try {
    let { id } = await post.save();
    if (files.length) {
      let basePath = "C:/Users/ommor/Documents/GitHub/backend/public";
      let _path = path.join(
        process.env.PUBLIC_PATH || basePath,
        "/posts",
        id.toString()
      );
      if (!fs.existsSync(_path)) {
        fs.mkdirSync(path.join(_path), { recursive: true });
      }

      files.forEach(({ originalname, buffer }) => {
        fs.writeFileSync(path.join(_path, originalname), buffer);
      });
    }
    res.send("Post added").status(200).end();
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};

export const post_fetch: RequestHandler = async (req, res) => {
  const body = req.body as IPostFetchReqBody;
  let post = await Post.find({ relations: ["neededItems", "postedBy"] });
  console.log(post);

  res.send(post).status(200).end();
};
