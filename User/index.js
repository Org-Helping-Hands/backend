const { Router } = require("express");
var admin = require("../Firebase/index");
var express = require("express");

/** @type {Router} */
var router = express.Router();
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
