import ChatRoom from "../models/ChatRoom";
import User from "../models/User";
import Message from "../models/Message";

export const home = async (req, res) => {
  const pageTitle = "Chat Rooms";
  const chatRooms = await ChatRoom.findAll({
    include: {
      model: User,
      attributes: { exclude: ["password"] },
      through: {
        attributes: [],
      },
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
  const user = req.session.user;
  if (!chatRoom) {
    return res.render("404", { pageTitle: "Room not found." });
  } else {
    return res.render("chat-rooms/detail", {
      pageTitle: `${chatRoom.name}`,
      chatRoom,
      user,
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

export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { name, max } = req.body;
  const chatRoom = await ChatRoom.findByPk(id);
  chatRoom.name = name;
  chatRoom.max = max;
  await chatRoom.save();
  return res.redirect(`/chats/${id}`);
};

export const getCreate = (req, res) => {
  return res.render("chat-rooms/create", { pageTitle: "Create Room" });
};

export const postCreate = async (req, res) => {
  const { name } = req.body;
  const pageTitle = "Create Room";
  try {
    const chatRoom = await ChatRoom.create({
      name: name,
      max: 10,
    });
    const user = await User.findByPk(req.session.user.id);
    await chatRoom.addUser(user);

    return res.redirect("/");
  } catch (error) {
    return res.render("chat-rooms/create", {
      pageTitle: pageTitle,
      errorMessage: error.message,
    });
  }
};

export const remove = async (req, res) => {
  const { id } = req.params;
  const chatRoom = await ChatRoom.findByPk(id);
  await chatRoom.destroy();
  return res.redirect("/");
};
