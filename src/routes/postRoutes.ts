import { Router } from "express";
import { post_create, post_fetch } from "../controllers/postController";
import { auth_token } from "../middlewares/auth";
import multer from "multer";

const upload = multer();
var router = Router();
router.post("/create", auth_token, upload.array("images"), post_create);
router.post("/fetch", auth_token, post_fetch);
export default router;
