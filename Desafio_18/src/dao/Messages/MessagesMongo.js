import { MongoDBContainer } from "../../containers/MongoDBContainer.js";
import { MessageModel } from "../../models/index.js";

export class MessagesMongo extends MongoDBContainer {
  constructor() {
    super({
      name: MessageModel.MessagesCollection,
      schema: MessageModel.MessageSchema,
    });
  }
}
