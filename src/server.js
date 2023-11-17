import http from "http";
import WebSocket from "ws";
import express from "express";
import morgan from "morgan";
import session from "express-session";
import ConnectSessionSequelize from "connect-session-sequelize";
import sequelize from "./db";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import chatRouter from "./routers/chatRouter";
import { localsMiddleware } from "./middlewares";
import { on } from "events";

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use("/public", express.static(process.cwd() + "/src/public"));
app.use(logger);
app.use(express.urlencoded({ extended: true }));

const SequelizeStore = ConnectSessionSequelize(session.Store);
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new SequelizeStore({ db: sequelize }),
  })
);

app.use(localsMiddleware);
app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/chats", chatRouter);
app.use("/uploads", express.static("uploads"));

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

function onSocketClose() {
  console.log("Disconnected from the Browser ❌");
}

function onSocketMessage(message) {
  console.log(message.toString("utf8"));
}

wss.on("connection", (socket) => {
  console.log("Connected to Browser ✅");
  socket.on("close", () => onSocketClose());
  socket.on("message", (message) => onSocketMessage(message));
  socket.send("hello!!");
});

export default server;
