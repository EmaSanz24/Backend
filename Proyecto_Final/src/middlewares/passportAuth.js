import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { UserRepository } from "../features/user/user.repository.js";
import bcrypt from "bcrypt";
import logger from "../logs/logger.js";

const init = () => {
  passport.serializeUser((user, done) => {
    logger.debug(user);
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    const user = await new UserRepository().getById(id);
    done(null, user);
  });

  passport.use(
    "login",
    new LocalStrategy({ usernameField: "email", passwordField: "password", passReqToCallback: true }, async (req, email, password, done) => {
      if (!email || !password) {
        logger.info(`email y/o password faltantes al momento de logear`);
        return done(null, false);
      }
      const user = await new UserRepository().getOne({ email: email });
      const compare = bcrypt.compareSync(password, user.password);
      if (!user || compare !== true) {
        logger.info(`las credenciales ingresadas son incorrectas`);
        return done(null, false);
      }
      const userResponse = {
        id: user._id,
        email: user.email,
        cart: user.cart,
      };
      done(null, userResponse);
    })
  );
};

export const passportAuth = {
  init,
};
