import { RequestHandler } from "express";
import admin from "../Firebase";
import { IBody } from "../interfaces";
import { Token } from "../models/tokenModel";
import { User } from "../models/userModel";

interface userSignInReqBody {
  name: string;
  idToken: string;
}
interface updateUserEmailReqBody extends IBody {
  emailId:string;
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
        user.tokens.push(Token.create({ token: idToken }));
        user.save();
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

export const user_update_email: RequestHandler = async (req, res) => {
  const body = req.body as updateUserEmailReqBody;
  let user = await User.findOne(body.userId);
  if( !user){  
    res.status(500).end();
   }
 else{
  let updatedUser = await User.create({
 ...user,emailId:body.emailId
 });
  updatedUser.save();
 res.status(200).end(); 
 }
  
};
