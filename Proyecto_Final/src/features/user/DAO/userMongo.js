import { MongoDBContainer } from "../../../containers/index.js";
import { UserModel } from "../user.model.js";

export class UsersMongo extends MongoDBContainer {
  constructor() {
    super({
      name: UserModel.UserCollection,
      schema: UserModel.UserSchema,
    });
  }
}
