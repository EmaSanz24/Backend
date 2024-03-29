import { Schema } from "mongoose";

const MessagesCollection = "messages";

const MessageSchema = new Schema(
  {
    message: {
      author: {
        id: { type: String, required: true, max: 100 },
        name: { type: String, required: true, max: 20 },
        lastname: { type: String, required: true, max: 25 },
        email: { type: String, required: true, max: 30 },
      },
      text: { type: String, required: true, max: 250 },
      timestamp: { type: String, required: true, max: 100 },
    },
  },
  { virtuals: true }
);

MessageSchema.set("toJSON", {
  transform: (_, response) => {
    response.id = response._id;
    delete response.__v;
    delete response._id;
    return response;
  },
});

export const MessageModel = { MessageSchema, MessagesCollection };
