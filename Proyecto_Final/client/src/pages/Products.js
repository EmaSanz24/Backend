import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ProductListContainer } from "../components/Products/ProductListContainer.js";

export const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/products`).then((res) => {
      setProducts(res.data);
    });
  }, []);
  return (
    <div className="product-cards">
      <h2>Nuestros Productos</h2>
      <div>
        <Link to={`/api/products/procesadores`}>Procesadores</Link>
        <ProductListContainer info={"procesador"} data={products} />
      </div>
      <div>
        <Link to={`/api/products/monitores`}>Monitores</Link>
        <ProductListContainer info={"monitor"} data={products} />
      </div>
      <div>
        <Link to={`/api/products/teclados`}>Teclados</Link>
        <ProductListContainer info={"teclado"} data={products} />
      </div>
    </div>
  );
};
