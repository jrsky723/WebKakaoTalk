import express from "express";
import { rooms } from "../controllers/chatRoomController";

const globalRouter = express.Router();

globalRouter.get("/", rooms);

export default globalRouter;
