import { Router } from "express";
import {
  post_create,
  post_fetch,
  post_fetch_details,
  post_fetch_images,
  post_update_status,
} from "../controllers/postController";
import { auth_token } from "../middlewares/auth";
import multer from "multer";

const upload = multer();
var router = Router();
router.post("/create", upload.array("images"), auth_token, post_create);
router.post("/fetch", auth_token, post_fetch);
router.post("/update-status", auth_token, post_update_status);
router.post("/fetch-details", auth_token, post_fetch_details);
router.post("/fetch-images", auth_token, post_fetch_images);
export default router;
