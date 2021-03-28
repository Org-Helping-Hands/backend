import { RequestHandler } from "express";
import admin from "../Firebase";
import { User, Tokens } from "../models/userModel";

interface reqBody {
  name: string;
  idToken: string;
}

export const user_signin: RequestHandler = (req, res) => {
  const body: reqBody = req.body;
  let idToken = body.idToken;
  admin
    .auth()
    .verifyIdToken(idToken)
    .then(async (decodedToken) => {
      const UserId = decodedToken.uid;
      let { name } = body;
      let user = await User.findOne({
        where: {
          id: UserId,
        },
      });
      if (!user) {
        User.create({
          name,
          phoneNumber: decodedToken.phone_number ?? "",
          id: decodedToken.uid,
        });
      }
      Tokens.create({ token: idToken, UserId });
      res.status(200).end();
    })
    .catch((error) => {});
};
