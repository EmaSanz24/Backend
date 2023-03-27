import { Router } from "express";
import { UserController } from "./user.controller.js";
import passport from "passport";
import { Authenticated } from "../../middlewares/authenticated.js";

const router = Router();

router.get("/signup", async (req, res) => {
  res.send({ status: "signup" });
});
router.post("/signup", async (req, res) => {
  const data = req.body;
  await new UserController(res).signUp(data);
});

router.post("/login", passport.authenticate("login", { successRedirect: "/api/products", failureRedirect: "/signup" }));

router.get("/", Authenticated, (req, res) => {
  res.redirect("/api/products");
});

export { router as UsersRouter };
