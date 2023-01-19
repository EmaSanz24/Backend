import { Router } from "express";
import passport from "passport";
import { UserDao } from "../../dao/index.js";

const router = Router();

router.post("/signup", async (req, res) => {
  const saltRounds = 10;
  try {
    const { name, lastname, email, password } = req.body;
    if (!name || !lastname || !email || !password) return res.send({ success: false });

    const existUser = await UserDao.getOne({ email });

    if (existUser && existUser.password) {
      return res.send({ success: false, error: "el usuario ya existe" });
    }

    if (existUser && !existUser.password) {
      const updateUser = await UserDao.updateById(existUser._id, {
        ...existUser,
        password,
      });
      return res.send({ success: true });
    }
    const hash = bcrypt.hash(password, saltRounds, function (err, hash) {
      return hash;
    });
    await UserDao.save({ name, lastname, email, hash });

    res.send({ success: true });
  } catch (error) {
    console.log(error);

    res.send({ success: false });
  }
});

router.post("/", passport.authenticate("login"), async (req, res) => {
  res.send({ success: true, message: "Logueado!", user: req.user });
});
