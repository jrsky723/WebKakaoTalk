import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import chatsRouter from "./routers/chatsRouter";
import http from "http";
import socketIO from "socket.io";
import { disconnect } from "process";

const PORT = 4000;

console.log(process.cwd());

const app = express();
const logger = morgan("dev");

const server = http.createServer(app);
const io = socketIO(server);

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/chats", chatsRouter);

// socket.io를 통한 패킷 교환
io.on("connection", (socket)=>{
  socket.on("chatting", (data)=>{
    console.log(data);
    //여기에 들어오는 패킷을 채팅들이다
  });
  socket.on("disconnect", (data) =>{
    console.log("disconnect");
  })
});


const handleListening = () =>
  console.log(`✅ Server listenting on port http://localhost:${PORT} 🚀`);

server.listen(PORT, handleListening);
