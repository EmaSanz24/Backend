import { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";

export const Count = ({ data, confirm }) => {
  const [count, setCount] = useState();
  const { id } = useParams();
  useEffect(() => {
    axios.get(`http://localhost:8000/api/products/${id}`).then((res) => {
      setCount(res.data.quantity);
    });
  }, []);

  const addQtt = () => {
    setCount(count + 1);
  };
  const remQtt = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };
  const onAdd = () => {
    confirm(true);
    const newData = { ...data, quantity: count };
    const cartId = useCookies.get("cartId");
    axios.post(`http://localhost:8000/api/cart/${cartId}/products`, newData);
  };
  return (
    <div>
      <div className="contador">
        <button onClick={remQtt}>-</button>
        <span>{count}</span>
        <button onClick={addQtt}>+</button>
      </div>
      <button className="addOnCart" onClick={onAdd}>
        Agregar al carrito
      </button>
    </div>
  );
};
