import User from "./User";
import ChatRoom from "./ChatRoom";
import Message from "./Message";

const setAssociations = () => {
  // User <-> ChatRoom
  User.belongsToMany(ChatRoom, { through: "UserChatRoom" });
  ChatRoom.belongsToMany(User, { through: "UserChatRoom" });

  // User <-> Message
  User.hasMany(Message, { foreignKey: "userId" });
  Message.belongsTo(User, { foreignKey: "userId" });

  // ChatRoom <-> Message
  ChatRoom.hasMany(Message, { foreignKey: "chatRoomId" });
  Message.belongsTo(ChatRoom, { foreignKey: "chatRoomId" });
};

export default setAssociations;
