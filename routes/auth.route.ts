import { Router } from "express";
const router = Router();
import auth_controller from "../controllers/auth.controller";

router
  .post("/signup", auth_controller.user_signup)
  .post("/login", auth_controller.user_login);

export default router;
