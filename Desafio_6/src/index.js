import express from "express";
import { Server as HttpServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import Container from "../src/containers/Container.js";
import { URL } from "url";

const __dirname = new URL(".", import.meta.url).pathname;
const dirname = __dirname.split("/").slice(1).join("/");
const app = express();
const httpServer = new HttpServer(app);
const io = new SocketIOServer(httpServer);
const PORT = process.env.PORT || 8080;

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(dirname + "/public/index.html");
});
httpServer.listen(PORT, () => console.log(`Server running on PORT:  ${PORT}`));

const productContainer = new Container("products");
const messagesContainer = new Container("messages");

io.on("connection", (socket) => {
  sendAllProducts(socket);
  sendAllMessages(socket);

  socket.on("new product", (newProduct) => {
    saveNewProduct(newProduct);
  });

  socket.on("new message", (newMessage) => {
    saveNewMessage(newMessage);
  });
});

const sendAllProducts = async (socket) => {
  const allProducts = await productContainer.getAll();
  socket.emit("all products", allProducts);
};

const saveNewProduct = async (newProduct) => {
  await productContainer.save(newProduct);
  const allProduct = await productContainer.getAll();
  io.sockets.emit("all products", allProduct);
};

const sendAllMessages = async (socket) => {
  const allMessages = await messagesContainer.getAll();
  socket.emit("all messages", allMessages);
};

const saveNewMessage = async (message) => {
  const date = new Date();
  const newMessage = { ...message, createdAt: `${date}` };
  await messagesContainer.save(newMessage);
  const allMessages = await messagesContainer.getAll();
  io.sockets.emit("all messages", allMessages);
};
