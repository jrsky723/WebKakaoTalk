import express from "express";
import { login, join, logout } from "../controllers/userController";
import { rooms } from "../controllers/chatRoomController";

const globalRouter = express.Router();

globalRouter.get("/", rooms);
globalRouter.get("/join", join);
globalRouter.get("/login", login);
globalRouter.get("/logout", logout);

export default globalRouter;
