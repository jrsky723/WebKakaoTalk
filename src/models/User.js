import { DataTypes } from "sequelize";
import sequelize from "../db";
import bcrypt from "bcrypt";

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  avatarURL: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.beforeCreate(async (user) => {
  if (!user.avatarURL) {
    user.avatarURL = `https://api.dicebear.com/7.x/identicon/svg?seed=${user.username}`;
  }
  user.password = await bcrypt.hash(user.password, 10);
});

export default User;
