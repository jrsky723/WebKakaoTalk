import express from "express";
import { login, join } from "../controllers/userController";
import { search } from "../controllers/chatController";

const globalRouter = express.Router();

const home = (req, res) => res.send("Home");

globalRouter.get("/", home);
globalRouter.get("/join", join);
globalRouter.get("/login", login);
globalRouter.get("/search", search);

export default globalRouter;
