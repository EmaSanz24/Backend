import { ProductRepo } from "../repositories/Products.Repository.js";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";

const schema = buildSchema(`
input ProductInput{
    title: String,
    description: String,
    thumbnail: String,
    price: Int,
    stock: Int,
}
type Product{
    id: ID!
    title: String,
    description: String,
    code: String,
    thumbnail: String,
    price: Int,
    stock: Int,
    timestamp: Float,
}
type Query{
    getProductByID(id: ID!): Product
    getOneProduct(options: ProductInput): Product,
    getAllProducts: [Product],
}
type Mutation{
    saveProduct(element: ProductInput): Product
    deleteProduct(id: ID!): Product,
    updateProduct(id: ID!, newData: ProductInput): Product

}`);

export class GraphQLController {
  contructor() {
    const api = new ProductRepo();
    return graphqlHTTP({
      schema: schema,
      rootValue: {
        getProductByID: api.getById,
        getOneProduct: api.getById,
        getAllProducts: api.getAll,
        saveProduct: api.save,
        deleteProduct: api.deleteById,
        updateProduct: api.updateById,
      },
      graphiql: true,
    });
  }
}
