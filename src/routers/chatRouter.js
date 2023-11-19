import express from "express";
import {
  see,
  getCreate,
  postCreate,
  deleteChatRoom,
} from "../controllers/chatRoomController";

const chatRouter = express.Router();

chatRouter.get("/:id(\\d+)", see);
chatRouter.get("/:id(\\d+)/delete", deleteChatRoom);
chatRouter.route("/create").get(getCreate).post(postCreate);

export default chatRouter;
