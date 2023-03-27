import { Link } from "react-router-dom";

export const Product = ({ data }) => {
  const { title, price, id, thumbnail } = data;
  return (
    <div className="item-product">
      <img src={`${thumbnail}`} alt="Imagen Producto" />
      <div className="product-details">
        <p>{title}</p>
        <span>${price}</span>
        <Link to={`/api/products/${id}`}>
          <button className="more-info">Mas Informacion</button>
        </Link>
      </div>
    </div>
  );
};
