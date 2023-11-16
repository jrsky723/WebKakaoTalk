import ChatRoom from "../models/ChatRoom";
import User from "../models/User";

export const rooms = async (req, res) => {
  try {
    const chatRooms = await ChatRoom.findAll({
      include: {
        model: User,
        attributes: { exclude: ["password"] },
        through: {
          attributes: [],
        },
      },
    });
    return res.render("chat-rooms/list", {
      pageTitle: "Chat Rooms",
      chatRooms,
    });
  } catch (error) {
    return res.render("chat-rooms/list", {
      pageTitle: "Chat Rooms",
      errorMessage: error.message,
    });
  }
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
  try {
    const chatRoom = await ChatRoom.create({
      name: name,
      max: 10,
    });

    //test user
    const userId = 1;
    const user = await User.findByPk(userId);
    await chatRoom.addUser(user);

    return res.redirect("/");
  } catch (error) {
    return res.render("chat-rooms/create", {
      pageTitle: "Create Room",
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
