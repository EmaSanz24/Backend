import axios from "axios";
axios.defaults.baseURL = "http://localhost:8080";

const newProduct = {
  title: "test",
  description: "desc test",
  code: "TST25",
  thumbnail: "testurl",
  price: "250",
  stock: "5",
};
const modProduct = {
  title: "testMod",
  description: "desc test Mod",
  code: "TST25",
  thumbnail: "testurl Mod",
  price: "500",
  stock: "1",
};
describe("test de productos en axios", function () {
  it("deberia traer todos los productos", async function () {
    const getAllRes = await axios.get("/");
  });
  it("deberia traer un solo producto", async function () {
    const getOneRes = await axios.get("/2");
  });
  it("deberia agregar el producto nuevo a la lista", async function () {
    const addRes = await axios.post("/", newProduct);
  });
  it("deberia actualizar el producto", async function () {
    const updateRes = await axios.put("/2", modProduct);
  });
  it("deberia borrar el producto seleccionado", async function () {
    const deleteRes = await axios.delete("/2");
  });
});
