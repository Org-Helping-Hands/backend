import { RequestHandler } from "express";
import admin from "../Firebase";

export const user_signin : RequestHandler = (req,res) => {
    // idToken comes from the client app
    let idToken = req.body.idToken;
    admin
      .auth()
      .verifyIdToken(idToken)
      .then((decodedToken) => {
        const uid = decodedToken.uid;        
        res.status(200).end()
        // ...
      })
      .catch((error) => {
        // Handle error
        console.log(error)
      });
  }