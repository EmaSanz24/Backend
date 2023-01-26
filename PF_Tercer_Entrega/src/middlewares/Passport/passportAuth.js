import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import * as passportStrategy from "./passportStrat.js";
const init = () => {
  passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      passportStrategy.login
    )
  );
  passport.use(
    "register",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      passportStrategy.register
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await UserDao.getById(id);
    done(null, user);
  });
};

export const PassportAuth = {
  init,
};
