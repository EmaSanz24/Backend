class User {
  constructor(name, lastname, books = [], pets = []) {
    this.name = name;
    this.lastname = lastname;
    this.books = books;
    this.pets = pets;
  }
  getFullName() {
    return `${this.name} ${this.lastname}`;
  }
  addPet(pet) {
    this.pets.push(pet);
  }
  countPets() {
    return this.pets.length;
  }
  addBook(title, author) {
    this.books.push({ title, author });
  }
  getBookNames() {
    return this.books.map((book) => book.title);
  }
}

const user1 = new User("Nicolas", "Occhiato", [{ title: "Percy Jackson, el ladron del rayo", author: "Rick Riordan" }], ["perro", "gato"]);

console.log(user1.getFullName());
console.log({ cantidad: user1.countPets() });
user1.addPet("loro");
console.log({ cantidad: user1.countPets() });
console.log(user1.getBookNames());
