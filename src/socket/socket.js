import ChatRoom from "../models/ChatRoom";
import Message from "../models/Message";
import User from "../models/User";

const saveMessage = async (message) => {
  try {
    const { userId, chatRoomId, content } = message;
    const newMessage = await Message.create({
      userId,
      chatRoomId,
      content,
    });
    console.log(`New message : ${newMessage.userId} : ${newMessage.content}`);
    return true;
  } catch (err) {
    console.error(err);
    console.log("Message save failed");
    return false;
  }
};

const getMessages = async (roomId) => {
  try {
    const messages = await Message.findAll({
      order: [["createdAt", "ASC"]],
      where: { chatRoomId: roomId },
      include: [
        {
          model: User,
          as: "User",
          attributes: ["name", "avatarURL"],
        },
      ],
    });
    return messages;
  } catch (err) {
    console.error(err);
  }
};

const addUserToRoom = async (userId, roomId) => {
  try {
    const user = await User.findByPk(userId);
    await user.addChatRoom(roomId);
  } catch (err) {
    console.error(err);
  }
};

const removeUserFromRoom = async (userId, roomId) => {
  try {
    const user = await User.findByPk(userId);
    await user.removeChatRoom(roomId);
  } catch (err) {
    console.error(err);
  }
};

const socketController = (io) => {
  io.on("connection", (socket) => {
    const annonymous = { id: null, name: "Anonnymous" };
    socket["user"] = annonymous;

    const userRoom = new Set();

    const leaveRoom = async (socket, roomId) => {
      socket.to(roomId).emit("bye", socket.user.name);
      if (userRoom.has(roomId)) {
        await removeUserFromRoom(socket.user.id, roomId);
        userRoom.delete(roomId);
      }
    };

    socket.onAny((event) => {
      console.log(`Socket Event: ${event}`);
    });
    socket.on("enter_room", async (chatRoomId, done) => {
      socket.join(chatRoomId);
      if (socket.user.id) {
        userRoom.add(chatRoomId);
        await addUserToRoom(socket.user.id, chatRoomId);
      }
      const messages = await getMessages(chatRoomId);
      socket.emit("get_messages", messages);
      done();
      socket.to(chatRoomId).emit("welcome", socket.user.name);
    });

    socket.on("leave_room", async (chatRoomId, done) => {
      socket.leave(chatRoomId);
      await leaveRoom(socket, chatRoomId);
      done();
    });

    socket.on("disconnecting", () => {
      socket.rooms.forEach(async (room) => {
        leaveRoom(socket, room);
      });
    });

    socket.on("new_message", async (message) => {
      socket.to(message.chatRoomId).emit("new_message", message);
      const saved = await saveMessage(message);
      if (!saved) {
        // room was deleted all socket in room should leave
        if ((await ChatRoom.findByPk(message.chatRoomId)) === null) {
          userRoom.delete(message.chatRoomId);
          socket.emit("refresh");
        }
      }
    });
    socket.on("set_user", (user) => (socket["user"] = user));
    socket.on("disconnect", () => {
      console.log("disconnect");
    });
    socket.on("error", (error) => {
      console.log(error);
    });
  });
};

export default socketController;
