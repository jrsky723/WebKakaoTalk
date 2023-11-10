import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import http from "http";
import socketIO from "socket.io";
import socketController from './socket/socket';
import { disconnect } from "process";
import chatRouter from "./routers/chatRouter";
import mysql from'mysql2';
import dbconfig from './database.js';

const connection = mysql.createConnection(dbconfig);

const PORT = 4000;

const app = express();
const logger = morgan("dev");

const server = http.createServer(app);
const io = socketIO(server);
socketController(io);


app.use(express.static('public'));
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/chats", chatRouter);


const handleListening = () =>
  console.log(`✅ Server listenting on port http://localhost:${PORT} 🚀`);

server.listen(PORT, handleListening);
