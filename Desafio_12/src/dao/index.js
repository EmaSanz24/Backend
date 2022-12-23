import { config } from "../config/index.js";
import { MongoDBService, FirebaseDBService } from "../services/index.js";
import { CartsMongo, CartsFilesystem, CartsMemory, CartsFirebase } from "./Carts/index.js";
import { ProductsMongo, ProductsFilesystem, ProductsMemory, ProductsFirebase } from "./Products/index.js";
import { MessagesMongo } from "./Messages/index.js";
import { UsersMongo } from "./Users/index.js";

const getSelectedDaos = () => {
  switch (config.SERVER.SELECTED_DATABASE) {
    case "mongo": {
      MongoDBService.init();
      return {
        ProductDao: new ProductsMongo(),
        CartDao: new CartsMongo(),
        MessageDao: new MessagesMongo(),
        UserDao: new UsersMongo(),
      };
    }
    case "filesystem": {
      return {
        ProductDao: new ProductsFilesystem(),
        CartDao: new CartsFilesystem(),
      };
    }
    case "memory": {
      return {
        ProductDao: new ProductsMemory(),
        CartDao: new CartsMemory(),
      };
    }
    case "firebase": {
      FirebaseDBService.init();
      return {
        ProductDao: new ProductsFirebase(),
        CartDao: new CartsFirebase(),
      };
    }
  }
};

const { ProductDao, CartDao, MessageDao, UserDao } = getSelectedDaos();
export { ProductDao, CartDao, MessageDao, UserDao };
