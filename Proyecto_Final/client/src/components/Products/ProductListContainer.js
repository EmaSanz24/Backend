import { useEffect, useState } from "react";
import { ProductList } from "./ProductList.js";

export const ProductListContainer = ({ info, data }) => {
  const [listProducts, setListProducts] = useState([]);

  let filt = [];

  useEffect(() => {
    filtering();
  }, [data]);

  const filtering = () => {
    data.map((product) => {
      if (product.category.toLowerCase() === info) {
        filt.push(product);
      }
    });
    setListProducts(filt);
  };

  return (
    <div className="list-products">
      <div className="product-cards">
        <ProductList items={listProducts} />
      </div>
    </div>
  );
};
