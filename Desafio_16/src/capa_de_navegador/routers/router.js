import passport from "passport";
import express from "express";
import Authenticated from "../../capa_de_navegador/middlewares/authenticated.js";
import { createTransport } from "nodemailer";
import { nodemailer } from "../../config/nodeMailer.js";
import logger from "../../logs/logger.js";

const routerPF = express.Router();

routerPF.get("/", Authenticated, (req, res) => {
  res.redirect("/login");
});

routerPF.get("/login", Authenticated, (req, res) => {
  res.render("login");
});

routerPF.post("/login", passport.authenticate("login", { failureRedirect: "/login-failed" }), (req, res) => {
  res.redirect("/");
});
routerPF.post("/register", passport.authenticate("register", { failureRedirect: "/register-failed" }), (req, res) => {
  const transporter = createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: nodemailer.user,
      pass: nodemailer.password,
    },
  });
  const email = {
    from: "Servidor Node.js",
    to: config.user,
    subject: "Nuevo Registro",
    html: `${req}`,
  };
  try {
    const info = transporter.sendMail(email);
    logger.info(`Se envio el mail con exito sobre el nuevo registro`);
  } catch (error) {
    logger.error(`Error al enviar el mail sobre el nuevo registro`);
  }
  res.redirect("/");
});
routerPF.get("/login-failed", (req, res) => {
  res.render("login-failed", {});
});
routerPF.get("/register-failed", (req, res) => {
  res.render("register-failed", {});
});

routerPF.get("/register", (req, res) => {
  res.render("register");
});

export { routerPF };
