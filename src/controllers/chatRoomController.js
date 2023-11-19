import ChatRoom from "../models/ChatRoom";
import User from "../models/User";

export const home = async (req, res) => {
  const pageTitle = "Web Chat";
  const chatRooms = await ChatRoom.findAll({
    include: {
      model: User,
      attributes: ["id", "name", "avatarURL"],
    },
  });
  return res.render("home", {
    pageTitle,
    chatRooms,
  });
};

export const see = async (req, res) => {
  const { id } = req.params;
  const chatRoom = await ChatRoom.findByPk(id);
  if (!chatRoom) {
    return res.render("404", { pageTitle: "Room not found." });
  } else {
    return res.render("chat-rooms/detail", {
      pageTitle: `${chatRoom.name}`,
      chatRoom,
    });
  }
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const chatRoom = await ChatRoom.findByPk(id);
  return res.render("chat-rooms/edit", {
    pageTitle: `Edit: ${chatRoom.name}`,
    chatRoom,
  });
};

export const getCreate = (req, res) => {
  return res.render("chat-rooms/create", { pageTitle: "Create Room" });
};

export const postCreate = async (req, res) => {
  const { name } = req.body;
  const pageTitle = "Create Room";
  try {
    const user = await User.findByPk(req.session.user.id);
    await ChatRoom.create({
      name: name,
      hostId: user.id,
    });
    return res.redirect("/");
  } catch (error) {
    return res.render("chat-rooms/create", {
      pageTitle: pageTitle,
      errorMessage: error.message,
    });
  }
};

export const deleteChatRoom = async (req, res) => {
  const { id } = req.params;
  const chatRoom = await ChatRoom.findByPk(id);
  await chatRoom.destroy();
  return res.redirect("/");
};
