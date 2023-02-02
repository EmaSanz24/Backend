import { MongoDBContainer } from "../../../capa_de_persistencia/containers/index.js";
import { UserModel } from "../../models/index.js";

export class UsersMongo extends MongoDBContainer {
  constructor() {
    super({
      name: UserModel.UserCollection,
      schema: UserModel.UserSchema,
    });
  }
}
