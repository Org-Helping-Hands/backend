import {Router} from 'express'
import admin from "../Firebase";
var router = Router();
router.post("/signin", (req,res) => {
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
});

module.exports = router
