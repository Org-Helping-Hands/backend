import { Router } from "express";
import {
  post_create,
  post_fetch,
  post_update_status,
} from "../controllers/postController";
import { auth_token } from "../middlewares/auth";
import multer from "multer";

const upload = multer();
var router = Router();
router.post("/create", upload.array("images"), auth_token, post_create);
router.post("/fetch", auth_token, post_fetch);
router.post("/update-status", auth_token, post_update_status);
export default router;
