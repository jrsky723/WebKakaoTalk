import express from "express";
import { home } from "../controllers/chatRoomController";

const rootRouter = express.Router();

rootRouter.get("/", home);

export default rootRouter;
