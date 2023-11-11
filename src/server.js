import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import chatRouter from "./routers/chatRouter";
import http from "http";
import socketIO from "socket.io";
import socketController from './socket/socket';

const app = express();
const logger = morgan("dev");

const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(__dirname + '/public'));
socketController(io);

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({ extended: true }));

app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/chats", chatRouter);

export default server;