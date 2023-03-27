import { OrderRepository } from "./order.repository.js";
import logger from "../../logs/logger.js";
import { createTransport } from "nodemailer";
import { nodemailer } from "../../config/index.js";

export class OrderController {
  constructor(res) {
    this.res = res;
  }
  async getOrders() {
    const orders = await new OrderRepository().getAll();
    orders
      ? this.res.send(orders)
      : (this.res.send({ error: true, message: "no hay ordenes almacenadas actualmente" }),
        logger.info("Se trato de obtener las ordenes sin que exista ninguna"));
  }
  async confirmOrder(data) {
    const { items, orderNumber, status, email } = data;

    const confirmed = await new OrderRepository().save(data);
    const transporter = createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: nodemailer.user,
        pass: nodemailer.password,
      },
    });
    const mail = {
      from: "Tima Tech",
      to: `${email}`,
      subject: `Orden de compra ${orderNumber}`,
      html: `<div>
        <h1>Informacion acerca de su orden de compra:</h1>
        <p><b>numero de orden:</b> ${orderNumber}</p>
        <p><b>estado de la compra:</b> ${status}</p>
        <p>los items pedidos son los siguientes: ${items}</p>
        </div>`,
    };
    if (!confirmed) {
      logger.info("Fallo al enviar el correo");
      return;
    }
    this.res.send(confirmed);
    transporter.sendMail(mail);
  }
}
