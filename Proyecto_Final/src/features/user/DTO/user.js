export class UserDTO {
  constructor({ name, lastname, email, phone, hash, address, cart, _id }) {
    this.id = _id.toHexString();
    this.name = name;
    this.lastname = lastname;
    this.email = email;
    this.phone = phone;
    this.password = hash;
    this.address = address;
    this.cart = cart;
  }
}
