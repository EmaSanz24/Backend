import express from "express";
import Container from "../containers/Container.js";

const productContainer = new Container("products");
const router = express.Router();

router.get("/", (req, res) => {
  productContainer.getAll().then((list) => {
    res.send(list);
  });
});

router.get("/:id", (req, res) => {
  const idGet = Number(req.params.id);
  productContainer.getById(idGet).then((product) => {
    if (product != undefined) {
      res.send(product);
    } else res.status(404).send({ error: "producto no encontrado" });
  });
});

router.post("/", (req, res) => {
  const { title, thumbnail, price } = req.body;
  let newProduct = { title, thumbnail, price };
  productContainer.save(newProduct);
  res.status(200).send("Producto agregado correctamente");
});

router.put("/:id", (req, res) => {
  const idGet = Number(req.params.id);
  const { title, thumbnail, price } = req.body;
  let newProduct = { title, thumbnail, price };
  productContainer.deleteById(idGet).then((product) => {
    if (product != "id not found") {
      productContainer.save(newProduct);
      res.send("Producto modifcado con exito");
    } else res.status(404).send({ error: "producto no encontrado, error al modificarlo" });
  });
});

router.delete("/:id", (req, res) => {
  const idGet = Number(req.params.id);
  productContainer.deleteById(idGet).then((product) => {
    if (product != "id not found") {
      res.send("Producto Borrado con Exito");
    } else res.status(404).send({ error: "producto no encontrado, no se pudo borrar" });
  });
});

export default router;
