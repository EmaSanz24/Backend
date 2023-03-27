export class OrderDTO {
  constructor({ id, items, orderNumber, timestamp, status, email }) {
    this.id = id;
    this.items = items;
    this.orderNumber = orderNumber;
    this.timestamp = timestamp;
    this.status = status;
    this.email = email;
  }
}
