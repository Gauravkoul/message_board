import chat_model from "../models/chat.model";
import { Request, Response } from "express";

export default {
  chats: async (req: Request, res: Response) => {
    console.log(req.query);
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    let data = chat_model.find();
    chat_model.find({}).then((chat: any) => {
      res.json(chat);
    });
  },
  message_delete: async (req: Request, res: Response) => {
    await chat_model.findByIdAndDelete({ _id: req.params.id });
  },
};
