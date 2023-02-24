import request from "supertest";
import { expect } from "chai";
import { app } from "../index.js";

describe("Comprobando el correcto funcionamiento de productos", function () {
  it("get all", async function () {
    const response = await request(app).get("/");
    expect(response.status).to.equal(200);
  });
  it("get one", async function () {
    const response = await request(app).get("/2");
    expect(response.status).to.equal(200);
    expect(response.body.id).to.equal(2);
  });
  it("add", async function () {
    const product = {
      title: "test title",
      description: "test description",
      code: "TST00",
      thumbnail: "thumbanil.test",
      price: 150,
      stock: 2,
    };
    const response = await (await request(app).post("/")).send(product);
    expect(response.status).to.equal(200);
    expect(response.body.code).to.equal("TST00");
  });
  it("update", async function () {
    const productUpdate = {
      title: "test title",
      description: "test description",
      code: "TST00",
      thumbnail: "thumbanil.test",
      price: 150,
      stock: 7,
    };
    const response = await request(app).put("/2").send(productUpdate);
    expect(response.status).to.equal(200);
    expect(response.body.stock).to.equal(7);
  });
  it("delete", async function () {
    const response = await request(app).delete("/1");
    expect(response.status).to.equal(200);
  });
});
