import { Router } from "express";
import { DATE_UTILS, ERRORS_UTILS, SUCCESS_UTILS } from "../../utils/index.js";
//import { MessageDao } from "../../dao/Dao.Factory.js";
import * as normalz from "normalizr";
import { MessageRepo } from "../../repositories/Messages.Repository.js";

const router = Router();
const normalize = normalz.normalize;
const denormalize = normalz.denormalize;

const authorSchema = new normalz.schema.Entity("authors");

const messageSchema = new normalz.schema.Entity("message", {
  author: authorSchema,
});

router.post("/", async (req, res) => {
  const { mail, name, lastName, age, alias, avatar, message } = req.body;
  const data = {
    message: {
      author: { id: mail, name: name, lastName: lastName, age: age, alias: alias, avatar: avatar },
      text: message,
      timestamp: DATE_UTILS.getTimestamp(),
    },
  };
  await MessageRepo.save(data);
  const actual = await MessageRepo.getAll();

  const normalizado = normalize(actual, messageSchema);
  res.send(normalizado);
});

router.get("/", async (req, res) => {
  const actual = await MessageRepo.getAll();

  const normalizado = normalize(actual, messageSchema);
  res.send(normalizado);
});

export { router as ChatRouter };
