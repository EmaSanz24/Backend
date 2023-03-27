import { MongoDBContainer } from "../../../containers/index.js";
import { MessageModel } from "../messages.model.js";

export class MessagesMongo extends MongoDBContainer {
  constructor() {
    super({
      name: MessageModel.MessagesCollection,
      schema: MessageModel.MessageSchema,
    });
  }
}
