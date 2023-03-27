import logger from "../../logs/logger.js";
import { UserRepository } from "./user.repository.js";
import { CartController } from "../cart/cart.controller.js";
import { UserDTO } from "./DTO/user.js";
import bcrypt from "bcrypt";
import { DATE_UTILS } from "../../utils/date.utils.js";
import { JOI_VALIDATOR } from "../../utils/joi.utils.js";

export class UserController {
  constructor(res) {
    this.res = res;
  }
  async signUp(data) {
    const { name, lastname, email, password, passwordCheck, phone, address } = data;
    const saltRounds = 10;
    if (!name || !lastname || !email || !password || !phone || !address) {
      logger.info("uno o mas campos de registro incompletos");
      return this.res.send({ success: false, message: "uno o mas campos de registro incompletos" });
    }
    if (password != passwordCheck) {
      logger.info("los passwords no coinciden");
      return this.res.send({ success: false, message: "las contraseñas no son iguales" });
    }
    const userExist = await new UserRepository().getOne({ email });
    if (userExist) {
      logger.info("usuario registrado con email ingresado");
      return this.res.send({ success: false, message: "ya existe un usuario registrado con ese email" });
    }
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    const cart = await new CartController().createCart();
    const finalUser = await JOI_VALIDATOR.user.validateAsync({
      timestamp: DATE_UTILS.getTimestamp(),
      name,
      lastname,
      email,
      phone,
      hash,
      address,
      cart,
    });
    const savedUser = await new UserRepository().save(finalUser);
    logger.info(savedUser);
    logger.info(cart);
    this.res.send({ success: true, userId: savedUser.id, cartId: cart.id });
    logger.info("Usuario creado con exito");
  }
}
