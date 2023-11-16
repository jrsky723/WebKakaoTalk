import User from "../models/User";
import { Op } from "sequelize";
import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";

export const see = async (req, res) => {
  const { id } = req.params;
  const pageTitle = "Profile";
  const user = await User.findOne({ where: { id } });
  if (!user) {
    return res.status(StatusCodes.NOT_FOUND).render("404", { pageTitle });
  }
  return res.render("users/profile", { pageTitle, user });
};

export const getJoin = (req, res) => {
  return res.render("users/join", { pageTitle: "Join" });
};
export const postJoin = async (req, res) => {
  const { name, username, email, password, password2 } = req.body;
  const pageTitle = "Join";
  // password === password2
  if (password !== password2) {
    return res.status(StatusCodes.BAD_REQUEST).render("users/join", {
      pageTitle,
      errorMessage: "Password confirmation does not match.",
    });
  }
  // check if username or email exists
  const exists = await User.findOne({
    where: {
      [Op.or]: [{ username }, { email }],
    },
    raw: true,
  });
  if (exists) {
    return res.status(StatusCodes.BAD_REQUEST).render("users/join", {
      pageTitle,
      errorMessage: "This username/email is already taken.",
    });
  }

  try {
    await User.create({
      name,
      username,
      email,
      password,
    });
    return res.redirect("/");
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).render("users/join", {
      pageTitle,
      errorMessage: error.message,
    });
  }
};

export const getLogin = (req, res) => {
  return res.render("users/login", { pageTitle: "Login" });
};
export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const pageTitle = "Login";
  const user = await User.findOne({ where: { username } });
  if (!user) {
    return res.status(StatusCodes.BAD_REQUEST).render("users/login", {
      pageTitle,
      errorMessage: "An account with this username does not exists.",
    });
  }
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(StatusCodes.BAD_REQUEST).render("users/login", {
      pageTitle,
      errorMessage: "Wrong password",
    });
  }
  req.session.loggedIn = true;
  req.session.user = user;
  req.session.save(() => {
    return res.redirect("/");
  });
};

export const logout = async (req, res) => {
  req.session.destroy(() => {
    return res.redirect("/");
  });
};

export const getEdit = (req, res) => {
  return res.render("users/edit", { pageTitle: "Edit Profile" });
};
export const postEdit = async (req, res) => {
  const {
    session: {
      user: { id, avatarURL },
    },
    body: { name, email },
    file,
  } = req;
  const pageTitle = "Edit Profile";
  try {
    const user = await User.findByPk(id);
    await user.update({
      name,
      email,
      avatarURL: file ? "/" + file.path : avatarURL,
    });
    req.session.user = user;
    return res.redirect("/users/edit");
  } catch (error) {
    return res.render("users/edit", {
      pageTitle,
      errorMessage: error.message,
    });
  }
};

export const remove = (req, res) => res.send("Remove User");
