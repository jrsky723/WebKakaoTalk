import { Op } from "sequelize";
import User from "../models/User";

export const edit = (req, res) => res.send("Edit User");
export const remove = (req, res) => res.send("Remove User");
export const logout = (req, res) => res.send("Logout");
export const see = (req, res) => res.send("See User");

export const getJoin = (req, res) => {
  return res.render("users/join", { pageTitle: "Join" });
};
export const postJoin = async (req, res) => {
  const { name, username, email, password, password2 } = req.body;
  const pageTitle = "Join";
  // password === password2
  if (password !== password2) {
    return res.status(400).render("users/join", {
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
    return res.status(400).render("users/join", {
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
    return res.status(400).render("users/join", {
      pageTitle,
      errorMessage: error.message,
    });
  }
};
export const getLogin = (req, res) => {
  return res.render("users/login", { pageTitle: "Login" });
};
export const postLogin = (req, res) => {
  return res.redirect("/");
};
