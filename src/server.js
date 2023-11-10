import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import chatsRouter from "./routers/chatsRouter";
import http from "http";
import socketIO from "socket.io";
import socketController from './socket/socket';
import { disconnect } from "process";
import chatRouter from "./routers/chatRouter";

const PORT = 4000;

const app = express();
const logger = morgan("dev");

const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static('public'));
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/chats", chatRouter);

socketController(io);

const handleListening = () =>
  console.log(`✅ Server listenting on port http://localhost:${PORT} 🚀`);

server.listen(PORT, handleListening);
