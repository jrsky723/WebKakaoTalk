let chatRooms = [
  {
    title: "First Chat Room",
    lastMessage: "Hello",
    createdAt: "2021-09-08 12:00:00",
    updatedAt: "2021-09-08 12:00:00",
    userCount: 2,
    id: 1,
  },
];
export const rooms = (req, res) => {
  return res.render("rooms", { pageTitle: "Chat Rooms", chatRooms });
};
export const see = (req, res) => {
  const { id } = req.params;
  const chatRoom = chatRooms.find((room) => room.id === parseInt(id));
  if (!chatRoom) {
    return res.render("404", { pageTitle: "Room not found." });
  } else {
    return res.render("chat", { pageTitle: `${chatRoom.title}`, chatRoom });
  }
};

export const getEdit = (req, res) => {
  const { id } = req.params;
  const chatRoom = chatRooms.find((room) => room.id === parseInt(id));
  return res.render("edit", { pageTitle: `Edit: ${chatRoom.title}`, chatRoom });
};

export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const chatRoom = chatRooms.find((room) => room.id === parseInt(id));
  chatRoom.title = title;
  return res.redirect(`/rooms/${id}`);
};

export const getCreate = (req, res) => {
  return res.render("create", { pageTitle: "Create Room" });
};

export const postCreate = (req, res) => {
  const { title } = req.body;
  console.log(title);
  const newRoom = {
    title,
    lastMessage: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    userCount: 0,
    id: chatRooms.length + 1,
  };
  chatRooms.push(newRoom);
  return res.redirect("/");
};
<<<<<<< HEAD
export const see = (req, res) => res.render("chat");
export const search = (req, res) => res.send("Search");
export const create = (req, res) => res.send("Create");
export const remove = (req, res) => res.send("Remove");

export const temp = (req, res) => res.render('temp', {pageTitle : 'temp'});
=======
>>>>>>> main
