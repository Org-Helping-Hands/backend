import { RequestHandler } from "express";
import { getRepository } from "typeorm";
import { IBody } from "../interfaces";
import { User } from "../models/userModel";

export const auth_token: RequestHandler = async (req, res, next) => {
  const body: IBody = req.body;
  const { userId, token, phoneNumber } = body;

  let user = await getRepository(User)
    .createQueryBuilder("user")
    .leftJoinAndSelect("user.tokens", "token")
    .where("user.id = :userId", { userId })
    .andWhere("token.token = :uToken", { uToken: token })
    .andWhere("user.phoneNumber = :uPhoneNumber", { uPhoneNumber: phoneNumber })
    .getMany();

  if (user) {
    next();
  } else {
    res.status(401).end();
  }
};
