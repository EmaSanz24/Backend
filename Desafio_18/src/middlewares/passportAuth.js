import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { UserDao } from "../dao/index.js";
import bcrypt from "bcrypt";

const init = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await UserDao.getById(id);
    done(null, user);
  });

  passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        try {
          if (!email || !password) return done(null, false);

          const user = await UserDao.getOne({ email: email });

          const compared = bcrypt.compare(password, user.password, function (err, result) {
            return result;
          });
          if (!user || compared !== true) return done(null, false);

          const userResponse = {
            id: user._id,
            email: user.email,
            cart: user.cart,
          };

          done(null, userResponse);
        } catch (error) {
          console.log(error);
          done(error);
        }
      }
    )
  );
};

export const PassportAuth = {
  init,
};
