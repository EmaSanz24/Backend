const NO_PRODUCTS = "No hay ningun producto registrado";
const NO_PRODUCT_FOUND = (id) => {
  return `El producto con el ID ${id} no existe`;
};
const ADD_FAILED = "Fallo al intentar agregar un producto";
const PRODUCT_UPDATE_FAILED = (id) => {
  return `No se pudo actualizar producto con el ID ${id} `;
};
const DELETE_FAILED = "Fallo al intentar borrar un producto";
const NO_CART = (id) => {
  return `No se encontro el carrito con el ID ${id} `;
};
const CART_DELETE_FAILED = (id) => {
  return `Fallo al intentar borrar el carrito con ID ${id} `;
};
const NO_PRODUCTS_IN_CART = (id) => {
  return `El carrito con ID ${id} no posee ningun producto`;
};
const PRODUCT_NOT_IN_CART = (id, cartId) => {
  return `El producto con ID ${id} no existe en el carrito con ID ${cartId}`;
};
const CART_CREATION_FAILED = "Fallo al crear el carrito de compras";

export const ERRORS_UTILS = {
  MESSAGES: {
    NO_PRODUCTS,
    NO_PRODUCT_FOUND,
    ADD_FAILED,
    DELETE_FAILED,
    NO_CART,
    PRODUCT_UPDATE_FAILED,
    CART_DELETE_FAILED,
    NO_PRODUCTS_IN_CART,
    PRODUCT_NOT_IN_CART,
    CART_CREATION_FAILED,
  },
};
