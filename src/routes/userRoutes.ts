import { Router } from "express";
import { user_get_data, user_signin } from "../controllers/userController";
import { auth_token } from "../middlewares/auth";
var router = Router();
// TODO: Change to sign-in
router.post("/signin", user_signin);
router.post("/get-data", auth_token, user_get_data);
export default router;
