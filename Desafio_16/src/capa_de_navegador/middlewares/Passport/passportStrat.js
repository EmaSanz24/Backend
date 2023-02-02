import { UserDao } from "../../dao/index.js";
import bcrypt from "bcrypt";
import logger from "../../logs/logger.js";

const validatePassword = (user, password) => {
  return bcrypt.compareSync(password, user.password);
};
const createHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

const login = async (req, email, password, done) => {
  try {
    const user = await UserDao.getOne({ email: email });
    if (!user) {
      logger.info("No existe ningun usuario registrado con el siguiente email " + email);
      return done(null, false);
    } else if (!validatePassword(user, password)) {
      logger.info("La contraseña ingresada no es correcta");
      return done(null, false);
    }
    return done(null, user);
  } catch (error) {
    logger.error("Ocurrio un fallo al ingresar a la cuenta");
  }
};
const register = async (req, email, password, name, lastname, address, age, phone, picture, done) => {
  try {
    const user = await UserDao.getOne({ email: email });
    if (user) {
      logger.info("Este email ya esta registrado");
      return done(null, false);
    }
    const newUser = {
      name,
      password: createHash(password),
      lastname,
      address,
      age,
      phone,
      picture,
    };
    const createdUser = await UserDao.save(newUser);
    return done(null, true);
  } catch (error) {
    logger.error("Ocurrio un fallo en el registro");
    done(null, false);
  }
};
export { login, register };
