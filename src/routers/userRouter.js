import express from "express";
import {
  getLogin,
  getJoin,
  logout,
  remove,
  see,
  postJoin,
  postLogin,
  getEdit,
  postEdit,
} from "../controllers/userController";
import {
  avatarUpload,
  protectorMiddleware,
  publicOnlyMiddleware,
} from "../middlewares";

const userRouter = express.Router();

userRouter.get("/logout", protectorMiddleware, logout);
userRouter
  .route("/edit")
  .all(protectorMiddleware)
  .get(getEdit)
  .post(avatarUpload.single("avatar"), postEdit);

userRouter.get("/remove", remove);
userRouter.route("/join").all(publicOnlyMiddleware).get(getJoin).post(postJoin);
userRouter
  .route("/login")
  .all(publicOnlyMiddleware)
  .get(getLogin)
  .post(postLogin);

userRouter.get("/:id(\\d+)", see);

export default userRouter;
