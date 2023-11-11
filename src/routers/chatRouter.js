import express from "express";
import {
  see,
  getEdit,
  postEdit,
  getCreate,
  postCreate,
  test,
} from "../controllers/chatController";

const chatRouter = express.Router();

chatRouter.get("/:id(\\d+)", see);
chatRouter.route("/:id(\\d+)/edit").get(getEdit).post(postEdit);
chatRouter.route("/create").get(getCreate).post(postCreate);
chatRouter.route("/test").get(test);

export default chatRouter;
