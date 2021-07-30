import admin from "firebase-admin";

if (process.env.FIREBASE_CONFIG_PATH) {
  var serviceAccount = require(process.env.FIREBASE_CONFIG_PATH);
} else new Error("Config path undefined");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
