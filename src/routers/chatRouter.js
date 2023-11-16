import express from "express";
import {
  see,
  getEdit,
  postEdit,
  getCreate,
  postCreate,
  getTest,
} from "../controllers/chatRoomController";

const chatRouter = express.Router();

chatRouter.get("/:id(\\d+)", see);
chatRouter.route("/:id(\\d+)/edit").get(getEdit).post(postEdit);
chatRouter.route("/create").get(getCreate).post(postCreate);
chatRouter.route("/test").get(getTest);

export default chatRouter;
