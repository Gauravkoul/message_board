import user_model from "../models/user.model";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

export default {
  user_signup: async (req: Request, res: Response) => {
    try {
      console.log(req.body);
      const user = await user_model.find({ username: req.body.username });
      if (user.length >= 1) {
        const err = new Error("email already taken");
        throw err;
      } else {
        const pass = await bcrypt.hash(req.body.password, 10);
        await user_model.create({
          username: req.body.username,
          password: pass,
        });

        res.render("login");
      }
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },
  user_login: async (req: Request, res: Response) => {
    try {
      console.log(req.body);
      const user = await user_model.findOne({ username: req.body.username });
      if (!user) throw new Error("user does not exist!");
      const is_equal = await bcrypt.compare(req.body.password, user.password);
      if (!is_equal) throw new Error("Password is incorrect!");

      res.render("chat", { username: req.body.username });
    } catch (err: any) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  },
};
