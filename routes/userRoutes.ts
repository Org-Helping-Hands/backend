import {Router} from 'express'
import { user_signin } from '../controllers/userController';
var router = Router();
router.post("/signin", user_signin);
export default router;