import express from "express";
import {
  see,
  getCreate,
  postCreate,
  deleteChatRoom,
} from "../controllers/chatRoomController";
import { protectorMiddleware } from "../middlewares";

const chatRouter = express.Router();

chatRouter.get("/:id(\\d+)", see);
chatRouter.get("/:id(\\d+)/delete", protectorMiddleware, deleteChatRoom);
chatRouter
  .route("/create")
  .all(protectorMiddleware)
  .get(getCreate)
  .post(postCreate);

export default chatRouter;
