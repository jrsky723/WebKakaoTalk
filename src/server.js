import express from "express";
import morgan from "morgan";
import session from "express-session";
import ConnectSessionSequelize from "connect-session-sequelize";
import sequelize from "./db";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import chatRouter from "./routers/chatRouter";
import { localsMiddleware } from "./middlewares";

const app = express();
const logger = morgan("dev");

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
app.use("/uploads", express.static("uploads"));

export default app;
