import express from "express";
import { see, edit, create, remove } from "../controllers/chatController";

const chatsRouter = express.Router();

chatsRouter.get("/:id(\\d+)", see);
chatsRouter.get("/:id(\\d+)/edit", edit);
chatsRouter.get("/:id(\\d+)/remove", remove);
chatsRouter.get("/create", create);

export default chatsRouter;
