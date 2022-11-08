import Knex from "knex";

const MariaDB = Knex({
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "ecommerce",
  },
});

class ContainerMDB {
  constructor(dbName) {
    MariaDB.schema
      .createTable(dbName, (table) => {
        table.increments("id");
        table.string("title");
        table.integer("price");
        table.string("thumbnail");
      })
      .then(() => console.log(`Tabla ${dbName} Creada Correctamente`))
      .catch((err) => {
        console.log(err);
      });
  }
  async save(element) {
    try {
      const newElement = await MariaDB(dbName).insert(element);

      console.log(newElement);
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id) {
    try {
      const foundElement = await MariaDB.from(dbName).select("id", id);

      if (!foundElement) return undefined;

      return foundElement;
    } catch (error) {
      console.log(error);
    }
  }

  async getAll() {
    try {
      const elements = await MariaDB.from(dbName).select("*");

      return elements;
    } catch (error) {
      console.log(error);
    }
  }
  async deleteById(id) {
    try {
      const foundElement = await MariaDB.from(dbName).where("id", id).del();
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAll() {
    try {
      await MariaDB.from(dbName).del();
    } catch (error) {
      console.log(error);
    }
  }
}

export default ContainerMDB;
