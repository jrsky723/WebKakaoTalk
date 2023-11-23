import User from "../models/User";
import { Op } from "sequelize";
import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import imgbbUploader from "imgbb-uploader";
import fs from "fs";

export const see = async (req, res) => {
  const { id } = req.params;
  const pageTitle = "Profile";
  const user = await User.findOne({ where: { id } });
  if (!user) {
    return res.status(StatusCodes.NOT_FOUND).render("404", { pageTitle });
  }
  return res.render("users/profile", { pageTitle, user });
};

export const getSignUp = (req, res) => {
  return res.render("users/sign-up", { pageTitle: "Sign Up" });
};
export const postSignUp = async (req, res) => {
  const { name, username, password, password2 } = req.body;
  const pageTitle = "Sign Up";
  // // password === password2
  // if (password !== password2) {
  //   return res.status(StatusCodes.BAD_REQUEST).render("users/sign-up", {
  //     pageTitle,
  //     errorMessage: "Password confirmation does not match.",
  //   });
  // }
  // check if username exists
  const exists = await User.findOne({
    where: {
      username,
    },
    raw: true,
  });
  if (exists) {
    return res.status(StatusCodes.BAD_REQUEST).render("users/sign-up", {
      pageTitle,
      errorMessage: "This username is already taken.",
    });
  }

  try {
    const user = await User.create({
      name,
      username,
      password,
    });
    req.session.loggedIn = true;
    req.session.user = user;
    req.session.save(() => {
      return res.redirect("/");
    });
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).render("users/sign-up", {
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
      user: { id, avatarURL, username },
    },
    body: { name, password, defaultAvatar },
    file,
  } = req;
  const pageTitle = "Edit Profile";
  let newAvatarURL = null;

  if (defaultAvatar) {
    newAvatarURL = `https://api.dicebear.com/7.x/identicon/svg?seed=${username}`;
  } else {
    if (file) {
      try {
        newAvatarURL = await ImgbbURL(file.path);
      } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).render("users/edit", {
          pageTitle,
          errorMessage: error.message,
        });
      }
      fs.unlinkSync(file.path);
    }
  }
  try {
    const user = await User.findByPk(id);
    await user.update({
      name,
      avatarURL: newAvatarURL || avatarURL,
      password: password ? await bcrypt.hash(password, 10) : user.password,
    });
    req.session.user = user;
    req.session.save(() => {
      return res.redirect("/users/edit");
    });
  } catch (error) {
    return res.render("users/edit", {
      pageTitle,
      errorMessage: error.message,
    });
  }
};

const ImgbbURL = async (filePath) => {
  try {
    const options = {
      apiKey: process.env.IMGBB_API_KEY,
      imagePath: filePath,
    };
    const response = await imgbbUploader(options);
    return response.display_url;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getDelete = (req, res) => {
  return res.render("users/delete", { pageTitle: "Delete Profile" });
};

export const postDelete = async (req, res) => {
  const {
    session: {
      user: { id },
    },
    body: { password },
  } = req;
  const pageTitle = "Delete Profile";
  const user = await User.findByPk(id);
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(StatusCodes.BAD_REQUEST).render("users/delete", {
      pageTitle,
      errorMessage: "Password is incorrect.",
    });
  }
  await user.destroy();
  req.session.destroy(() => {
    return res.redirect("/");
  });
};
