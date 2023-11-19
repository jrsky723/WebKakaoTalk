import Message from "../models/Message";
import User from "../models/User";

const saveMessage = async (data) => {
  try {
    await Message.create({
      content: data.content,
      userId: data.userId,
      chatRoomId: data.chatRoomId,
    });
    console.log(
      `userID ${data.userId}가 ${data.chatRoomId}번 방에 메시지를 보냈습니다.`
    );
  } catch (err) {
    console.error(err);
    console.log("Message 저장 실패");
  }
};

const updateClient = async (io, data) => {
  try {
    const result = await Message.findAll({
      where: { chatRoomId: data.chatRoomId },
      order: [["createdAt", "DESC"]],
      limit: 1,
      include: [
        {
          model: User,
          as: "User",
        },
      ],
    });
    io.emit("new item", result);
  } catch (err) {
    console.error(err);
  }
};

const initChatRoom = async (io, data) => {
  try {
    const result = await Message.findAll({
      order: [["createdAt", "ASC"]],
      where: { chatRoomId: data.chatRoomId },
      include: [
        {
          model: User,
          as: "User",
        },
      ],
    });
    io.emit("init", result);
  } catch (err) {
    console.error(err);
  }
};

function socketController(io) {
  io.on("connection", (socket) => {
    console.log("connect");
    socket.on("join", function (data) {
      initChatRoom(io, data);
    });

    socket.on("chatting", async (data) => {
      console.log("chatting event");
      await saveMessage(data);
      updateClient(io, data);
    });

    socket.on("disconnect", (data) => {
      console.log("disconnect");
    });
    socket.on("error", (error) => {
      console.log(error);
    });
  });
}

export default socketController;
