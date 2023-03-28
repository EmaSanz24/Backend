import * as normalizr from "normalizr";
import logger from "../../logs/logger.js";
import { DATE_UTILS } from "../../utils/date.utils.js";
import { MessageRepository } from "./messages.repository.js";
import { app } from "../../server.js";
import { Server as httpServer } from "http";
import { Server as socketIOServer } from "socket.io";
import { JOI_VALIDATOR } from "../../utils/joi.utils.js";

export class MessageController {
  constructor(res) {
    this.res = res;
  }
  async getMessages() {
    const actual = await new MessageRepository().getAll();
    logger.debug(actual);
    if (!actual || actual.length < 1) {
      logger.info("no se encontraron mensajes almacenados");
      this.res.send({ succes: false, message: "no messages" });
      return;
    }
    const normalize = normalizr.normalize;
    const authorSchema = new normalizr.schema.Entity("authors");
    const messageSchema = new normalizr.schema.Entity("message", { author: authorSchema });
    const normalized = normalize(actual, messageSchema);
    this.res.send(normalized);
  }
  async newMessage(data) {
    const { email, name, lastname, text, id } = data;
    const msg = await JOI_VALIDATOR.message.validateAsync({
      message: {
        author: {
          id: id,
          name: name,
          lastname: lastname,
          email: email,
        },
        text: text,
        timestamp: DATE_UTILS.getTimestamp(),
      },
    });
    const normalize = normalizr.normalize;
    const authorSchema = new normalizr.schema.Entity("authors");
    const messageSchema = new normalizr.schema.Entity("message", { author: authorSchema });
    await new MessageRepository().save(msg);
    const actual = await new MessageRepository().getAll();
    const normalized = normalize(actual, messageSchema);
    this.res.send(normalized);
  }
  async filterByEmail(email) {
    const actual = await new MessageRepository().getAll();
    if (!actual || actual.length < 1) {
      logger.info("no se encontraron mensajes almacenados");
      this.res.send({ succes: false, message: "no messages" });
      return;
    }
    filter = [];
    actual.map((el) => {
      if (el.email === email) {
        filter.push(el);
      }
    });
    const normalize = normalizr.normalize;
    const authorSchema = new normalizr.schema.Entity("authors");
    const messageSchema = new normalizr.schema.Entity("message", { author: authorSchema });
    const normalized = normalize(filter, messageSchema);
    this.res.send(normalized);
  }
  async socketStart() {
    const HttpServer = new httpServer(app);
    const io = new socketIOServer(HttpServer);
    io.on("connection", (socket) => {
      this.getMessages(socket);
      socket.on("new message", (newMessage) => {
        this.newMessage(newMessage);
      });
    });
  }
}
