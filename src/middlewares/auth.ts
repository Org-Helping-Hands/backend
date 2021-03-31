import { RequestHandler } from "express";
import { User } from "../models/userModel";

interface IBody {
  userId: string;
  phoneNumber: string;
  token: string;
}

export const auth_token: RequestHandler = async (req, res, next) => {
  const body: IBody = req.body;
  const { userId, token, phoneNumber } = body;
  let user = await User.findOne({
    where: {
      id: userId,
      tokens: [token],
      phoneNumber,
    },
  });
  if (user) {
    next();
  } else {
    res.status(401).end();
  }
};
