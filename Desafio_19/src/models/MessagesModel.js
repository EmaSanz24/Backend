import { Schema } from "mongoose";

// class Message {
//   constructor({ id, name, lastName, age, alias, avatar, text, timestamp }) {
//     author: {
//       this.id = id;
//       this.name = name;
//       this.lastName = lastName;
//       this.age = age;
//       this.alias = alias;
//       this.avatar = avatar;
//     }
//     this.text = text;
//     this.timestamp = timestamp;
//   }
// }

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
