import Container from "./containers/Container.js";
import express from "express";

const productContainer = new Container("products");

const app = express();
const PORT = process.env.PORT || 8080;

app.get("/products", (req, res) => {
  productContainer.getAll().then((list) => {
    res.send(list);
  });
});

app.get("/randomProduct", (req, res) => {
  productContainer
    .getAll()
    .then((parseList) => parseList[Math.floor(Math.random() * parseList.length)])
    .then((itemList) => res.send(itemList));
});

app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`));
