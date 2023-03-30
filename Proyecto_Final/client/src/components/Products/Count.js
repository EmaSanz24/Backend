import { useState } from "react";
import axios from "axios";

export const Count = (data, confirm) => {
  const [count, setCount] = useState(data.quantity);

  const addQtt = () => {
    setCount(count + 1);
  };
  const remQtt = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };
  const onAdd = () => {
    // const cookie = document.cookie.
    // axios.post(`http://localhost:8000/api/cart/${}/products`,data)
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
