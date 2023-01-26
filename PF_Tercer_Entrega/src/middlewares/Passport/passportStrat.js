import { UserDao } from "../../dao/index.js";
import bcrypt from "bcrypt";

const validatePassword = (user, password) => {
  return bcrypt.compareSync(password, user.password);
};
const createHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

const login = async (req, email, password, done) => {
  await UserDao.getOne({ email: email }, (err, user) => {
    if (err) {
      console.log("Ocurrio un fallo al ingresar a la cuenta");
      return done(err);
    }
    if (!user) {
      console.log("No existe ningun usuario registrado con el siguiente email " + email);
      return done(null, false);
    }
    if (!validatePassword(user, password)) {
      console.log("La contraseña ingresada no es correcta");
      return done(null, false);
    }
    return done(null, user);
  });
};
const register = async (req, email, password, name, lastname, address, age, phone, picture, done) => {
  await UserDao.getOne({ email: email }, (err, user) => {
    if (err) {
      console.log("Ocurrio un fallo en el registro");
      return done(err);
    }
    if (user) {
      console.log("Ese email ya esta registrado");
      return done(null, false);
    } else {
      const newUser = new UserDao();
      newUser.name = name;
      newUser.password = createHash(password);
      newUser.lastname = lastname;
      newUser.address = address;
      newUser.age = age;
      newUser.phone = phone;
      newUser.picture = picture;
      newUser
        .save()
        .then((data) => done(null, data))
        .catch(null, false);
    }
  });
};
export { login, register };
