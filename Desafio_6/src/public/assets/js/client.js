const socket = io("http://localhost:8080");

const productForm = document.getElementById("product-form");
const productsContainer = document.getElementById("products");
const chatForm = document.getElementById("chat");
const chatContainer = document.getElementById("chatContainer");

productForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(productForm);
  const formValues = Object.fromEntries(formData);
  productForm.reset();
  socket.emit("new product", formValues);
});

socket.on("all products", (allProducts) => {
  handleRender(allProducts);
});

const handleRender = async (products) => {
  const res = await fetch("/assets/templates/product.template.hbs");
  const template = await res.text();
  const compiledTemplate = Handlebars.compile(template);
  const html = compiledTemplate({ products });
  productsContainer.innerHTML = html;
};

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(chatForm);
  const formValues = Object.fromEntries(formData);
  chatForm.reset();
  socket.emit("new message", formValues);
});

socket.on("all messages", (allMessages) => {
  handleRenderChat(allMessages);
});

const handleRenderChat = async (messages) => {
  const res = await fetch("/assets/templates/chat.template.hbs");
  const template = await res.text();
  const compiledTemplate = Handlebars.compile(template);
  const html = compiledTemplate({ messages });
  chatContainer.innerHTML = html;
};
