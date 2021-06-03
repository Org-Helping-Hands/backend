import { RequestHandler } from "express";
import admin from "../Firebase";
import { IBody } from "../interfaces";
import { Token } from "../models/tokenModel";
import { User } from "../models/userModel";
import crypto from "crypto";

interface userSignInReqBody {
  name: string;
  idToken: string;
}

export const user_signin: RequestHandler = (req, res) => {
  const body: userSignInReqBody = req.body;
  let idToken = body.idToken;
  admin
    .auth()
    .verifyIdToken(idToken)
    .then(async (decodedToken) => {
      try {
        const id = decodedToken.uid;
        let { name } = body;
        let user = User.create({
          name,
          phoneNumber: decodedToken.phone_number ?? "",
          id,
        });
        let User_user = await User.findOne(user);
        user.tokens = User_user?.tokens ?? [];
        let newToken = crypto.randomBytes(100).toString("hex");
        user.tokens.push(Token.create({ token: newToken }));
        user.save();
        res.send({ newToken });
        res.status(200).end();
      } catch (_) {
        res.status(500).send("Error occured");
      }
    })
    .catch((error) => {});
};

export const user_get_data: RequestHandler = async (req, res) => {
  const body = req.body as IBody;

  let user = await User.findOne(body.userId);
  res.send(user).end();
};
