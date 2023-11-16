import express from "express";
import morgan from "morgan";
import session from "express-session";
import ConnectSessionSequelize from "connect-session-sequelize";
import sequelize from "./db";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import chatRouter from "./routers/chatRouter";
import http from "http";
import socketIO from "socket.io";
import socketController from './socket/socket';
import { localsMiddleware } from "./middlewares";

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

export default server;