import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ProductDetail } from "../components/Products/ProductDetail.js";
import axios from "axios";
export const Detail = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState({});
  useEffect(() => {
    axios.get(`http://localhost:8000/api/products/${id}`).then((res) => {
      setDetail(res.data);
    });
  }, []);

  return (
    <div>
      <ProductDetail data={detail} />
    </div>
  );
};
