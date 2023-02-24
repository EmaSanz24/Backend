export class MessageDTO {
  constructor({ id, name, lastName, age, alias, avatar, text, timestamp }) {
    author: {
      this.id = id;
      this.name = name;
      this.lastName = lastName;
      this.age = age;
      this.alias = alias;
      this.avatar = avatar;
    }
    this.text = text;
    this.timestamp = timestamp;
  }
}
export function asMessageDto(el) {
  if (Array.isArray(el)) return el.map((obj) => new MessageDTO(obj));
  else return new MessageDTO(el);
}
