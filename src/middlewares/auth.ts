import { RequestHandler } from "express";
import { getRepository } from "typeorm";
import { IBody, IHeader } from "../interfaces";
import { User } from "../models/userModel";

export const auth_token: RequestHandler = async (req, res, next) => {
  const header = req.headers as IHeader;
  let user = await getRepository(User)
    .createQueryBuilder("user")
    .leftJoinAndSelect("user.tokens", "token")
    .andWhere("token.token = :uToken", { uToken: header.token })
    .getOne();

  if (user) {
    (req.body as IBody).userId = user?.id;
    next();
  } else {
    res.status(401).end();
  }
};
