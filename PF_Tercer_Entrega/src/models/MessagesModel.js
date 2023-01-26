import { Schema } from "mongoose";

const MessagesCollection = "messages";

const MessageSchema = new Schema(
  {
    message: {
      author: {
        id: { type: String, required: true, max: 100 },
        name: { type: String, required: true, max: 20 },
        lastName: { type: String, required: true, max: 25 },
        age: { type: Number, required: true, max: 100 },
        alias: { type: String, required: true, max: 30 },
        avatar: { type: String, required: true, max: 500 },
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
