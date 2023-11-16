import express from "express";
import {
  edit,
  getLogin,
  getJoin,
  logout,
  remove,
  see,
  postJoin,
  postLogin,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/logout", logout);
userRouter.route("/edit").get(edit).post(edit);
userRouter.get("/remove", remove);
userRouter.route("/login").get(getLogin).post(postLogin);
userRouter.route("/join").get(getJoin).post(postJoin);
userRouter.get("/:id(\\d+)", see);

export default userRouter;
