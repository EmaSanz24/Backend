export class MessageDTO {
  constructor({ email, name, lastname, id, text, timestamp }) {
    this.email = email;
    this.name = name;
    this.lastname = lastname;
    this.id = id;
    this.text = text;
    this.timestamp = timestamp;
  }
}
