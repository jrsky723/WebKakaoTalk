import User from "./User";
import ChatRoom from "./ChatRoom";
import Message from "./Message";

const setAssociations = () => {
  // User <-> ChatRoom
  User.belongsToMany(ChatRoom, {
    through: "UserChatRoom",
    onDelete: "cascade",
  });
  ChatRoom.belongsToMany(User, {
    through: "UserChatRoom",
    onDelete: "cascade",
  });

  // User <-> ChatRoom (host)
  User.hasMany(ChatRoom, { foreignKey: "hostId", onDelete: "cascade" });
  ChatRoom.belongsTo(User, { as: "host", foreignKey: "hostId" });

  // User <-> Message
  User.hasMany(Message, { foreignKey: "userId", onDelete: "cascade" });
  Message.belongsTo(User, { foreignKey: "userId" });

  // ChatRoom <-> Message
  ChatRoom.hasMany(Message, { foreignKey: "chatRoomId", onDelete: "cascade" });
  Message.belongsTo(ChatRoom, { foreignKey: "chatRoomId" });
};

export default setAssociations;
