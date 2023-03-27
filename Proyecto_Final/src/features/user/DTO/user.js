export class UserDTO {
  constructor({ name, lastname, email, phone, hash, address, cart, id }) {
    this.id = id;
    this.name = name;
    this.lastname = lastname;
    this.email = email;
    this.phone = phone;
    this.password = hash;
    this.address = address;
    this.cart = cart;
  }
}
