import { config } from "../config/index.js";
import { MongoDBService } from "../services/index.js";
import { ProductsMongo, ProductsFilesystem } from "../features/product/DAO/index.js";
import { CartsFileSystem, CartsMongo } from "../features/cart/DAO/index.js";
import { UsersFileSystem, UsersMongo } from "../features/user/DAO/index.js";
import { MessagesFilesystem, MessagesMongo } from "../features/messages/DAO/index.js";
import { OrdersFilesystem, OrdersMongo } from "../features/orders/DAO/index.js";

const getSelectedDAOs = () => {
  switch (config.SERVER.SELECTED_DATABASE) {
    case "mongo": {
      MongoDBService.init();
      return {
        ProductDAO: new ProductsMongo(),
        CartDAO: new CartsMongo(),
        UserDAO: new UsersMongo(),
        MessageDAO: new MessagesMongo(),
        OrderDAO: new OrdersMongo(),
      };
    }
    case "filesystem": {
      return {
        ProductDAO: new ProductsFilesystem(),
        CartDAO: new CartsFileSystem(),
        UserDAO: new UsersFileSystem(),
        MessageDAO: new MessagesFilesystem(),
        OrderDAO: new OrdersFilesystem(),
      };
    }
  }
};
const { ProductDAO, CartDAO, UserDAO, MessageDAO, OrderDAO } = getSelectedDAOs();
export { ProductDAO, CartDAO, UserDAO, MessageDAO, OrderDAO };
