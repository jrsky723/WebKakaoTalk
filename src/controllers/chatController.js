export const rooms = (req, res) => {
  const chatRooms = [
    {
      title: "Yang",
      lastMessage: "Hello",
      createdAt: "2021-09-08 12:00:00",
      updatedAt: "2021-09-08 12:00:00",
      userCount: 2,
    },
  ];
  res.render("home", { pageTitle: "Chat Rooms", chatRooms });
};
export const see = (req, res) => res.render("chat");
export const search = (req, res) => res.send("Search");
export const create = (req, res) => res.send("Create");
export const remove = (req, res) => res.send("Remove");

export const temp = (req, res) => res.render('temp', {pageTitle : 'temp'});
