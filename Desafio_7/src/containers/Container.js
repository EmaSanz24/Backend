import fs from "fs";

class Container {
  constructor(fileName) {
    this.filePath = `./src/db/${fileName}.json`;
  }
  async save(element) {
    try {
      const elements = await this.getAll();

      const id = elements.length === 0 ? 1 : elements[elements.length - 1].id + 1;

      element.id = id;

      elements.push(element);

      await fs.promises.writeFile(this.filePath, JSON.stringify(elements, null, 3));
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id) {
    try {
      const elements = await this.getAll();

      const foundElement = elements.find((element) => element.id === id);

      if (!foundElement) return undefined;

      return foundElement;
    } catch (error) {
      console.log(error);
    }
  }

  async getAll() {
    try {
      const file = await fs.promises.readFile(this.filePath, "utf-8");
      const elements = JSON.parse(file);

      return elements;
    } catch (error) {
      console.log(error);
      if (error.errno === -4058) {
        await fs.promises.writeFile(this.filePath, JSON.stringify([], null, 3));
        return [];
      }
    }
  }
  async deleteById(id) {
    try {
      const elements = await this.getAll();

      const foundElement = elements.find((element) => element.id === id);

      if (!foundElement) return "id not found";

      const filterElement = elements.filter((element) => element.id != id);

      await fs.promises.writeFile(this.filePath, JSON.stringify(filterElement, null, 3));
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAll() {
    try {
      await fs.promises.writeFile(this.filePath, JSON.stringify([], null, 3));
    } catch (error) {
      console.log(error);
    }
  }
}

export default Container;
