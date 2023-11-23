import express from "express";
import {
  getLogin,
  getSignUp,
  logout,
  see,
  postSignUp,
  postLogin,
  getEdit,
  postEdit,
  getDelete,
  postDelete,
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

userRouter
  .route("/delete")
  .all(protectorMiddleware)
  .get(getDelete)
  .post(postDelete);

userRouter
  .route("/sign-up")
  .all(publicOnlyMiddleware)
  .get(getSignUp)
  .post(postSignUp);

userRouter
  .route("/login")
  .all(publicOnlyMiddleware)
  .get(getLogin)
  .post(postLogin);

userRouter.get("/:id(\\d+)", see);

export default userRouter;
