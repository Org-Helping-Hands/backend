import admin from "firebase-admin"

var serviceAccount = require("./helping-hands-f0a98-firebase-adminsdk-ia6nq-df53617bfe.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export default admin;