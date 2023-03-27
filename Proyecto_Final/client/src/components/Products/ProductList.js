import { Product } from "./Product.js";

export const ProductList = ({ items }) => {
  return (
    <>
      {items.map((product) => {
        return <Product key={product.code} data={product} />;
      })}
    </>
  );
};
