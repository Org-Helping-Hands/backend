import { Router } from "express";
import { post_create } from "../controllers/postController";
import { auth_token } from "../middlewares/auth";
import multer from "multer";

const upload = multer();
var router = Router();
router.post("/create", auth_token, upload.array("images"), post_create);
export default router;
