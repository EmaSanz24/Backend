import * as admin from "firebase-admin";
//const db = admin.firestore();
class FirebaseContainer {
  constructor({ name }) {
    this.db = db.collection(name);
  }

  async getAll() {
    const response = await this.db.findAll();
    return response;
  }

  async save(element) {
    const response = await this.db.create(element);
    return response;
  }

  async getById(id) {
    const response = await this.db.doc(id).get();
    return response;
  }

  async deleteById(id) {
    const response = await this.db.doc(id).delete();
    return response;
  }

  async updateById(id, newData) {
    const response = await this.db.doc(id).update(newData);
    return response;
  }
}

export { FirebaseContainer };
