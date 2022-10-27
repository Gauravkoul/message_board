import { Router } from "express";
const router = Router();
import chat_controller from "../controllers/chat.controller";

router.get("/", chat_controller.chats);
router.get("/delete/:id", chat_controller.message_delete);

export default router;
