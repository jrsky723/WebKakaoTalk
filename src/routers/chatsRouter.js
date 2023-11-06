import express from "express";
import { see, create, search, remove } from "../controllers/chatController";

const chatsRouter = express.Router();

chatsRouter.get("/:id(\\d+)", see);
chatsRouter.get("/:id(\\d+)/remove", remove);
chatsRouter.get("/create", create);
chatsRouter.get("/search", search);

export default chatsRouter;
