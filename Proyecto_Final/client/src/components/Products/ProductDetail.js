import { useState } from "react";
import { Link } from "react-router-dom";
import { Count } from "./Count.js";
export const ProductDetail = ({ data }) => {
  const { title, thumbnail, price, description } = data;
  const [confirm, setConfirm] = useState(false);

  return (
    <div className="ProductDetail">
      <img src={`${thumbnail}`} alt="imagen producto" />
      <div className="ProductInfo">
        <h2>{title}</h2>
        <p>{description}</p>
        <div>
          <span>${price}</span>
        </div>

        <div>
          {confirm === true ? (
            <button>
              <Link className="toCart" to="/api/cart/">
                ir al carrito
              </Link>
            </button>
          ) : (
            <Count data={data} confirm={setConfirm} />
          )}
        </div>
      </div>
    </div>
  );
};
