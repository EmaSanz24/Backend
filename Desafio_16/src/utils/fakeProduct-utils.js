import { faker } from "@faker-js/faker";
faker.locale = "es";

const createFakeProduct = () => {
  return {
    id: faker.datatype.uuid(),
    title: faker.commerce.product(),
    description: faker.commerce.productDescription(),
    code: faker.random.alphaNumeric(8),
    thumbnail: faker.image.technics(),
    price: faker.commerce.price(100, 5000),
    stock: faker.random.numeric(3),
  };
};

export { createFakeProduct };
