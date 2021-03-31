import { RequestHandler } from "express";
import admin from "../Firebase";
import { User, Token } from "../models/userModel";

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
        user.tokens.push(Token.create({ token: idToken }));
        user.save();
        res.status(200).end();
      } catch (_) {
        res.status(500).send("Error occured");
      }
    })
    .catch((error) => {});
};
