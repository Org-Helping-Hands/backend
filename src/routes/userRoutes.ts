import { Router } from "express";
import {
  user_get_data,
  user_signin,
  user_request_email_update,
  user_verify_update_email,
} from "../controllers/userController";
import { auth_token } from "../middlewares/auth";
var router = Router();
// TODO: Change to sign-in
router.post("/signin", user_signin);
router.post("/get-data", auth_token, user_get_data);
router.post("/request-email-update", auth_token, user_request_email_update);
router.post("/verify-update-email", auth_token, user_verify_update_email);
export default router;
