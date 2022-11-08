import Knex from "knex";

const Sqlite3DB = Knex({
  client: "sqlite3",
  connection: {
    filename: "../db/messages.sqlite",
  },
});

class ContainerSQ3 {
  constructor(dbName) {
    Sqlite3DB.schema
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
      const newElement = await Sqlite3DB(dbName).insert(element);

      console.log(newElement);
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id) {
    try {
      const foundElement = await Sqlite3DB.from(dbName).select("id", id);

      if (!foundElement) return undefined;

      return foundElement;
    } catch (error) {
      console.log(error);
    }
  }

  async getAll() {
    try {
      const elements = await Sqlite3DB.from(dbName).select("*");

      return elements;
    } catch (error) {
      console.log(error);
    }
  }
  async deleteById(id) {
    try {
      const foundElement = await Sqlite3DB.from(dbName).where("id", id).del();
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAll() {
    try {
      await Sqlite3DB.from(dbName).del();
    } catch (error) {
      console.log(error);
    }
  }
}

export default ContainerSQ3;
