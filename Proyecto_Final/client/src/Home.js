import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    axios.get("http://localhost:8000").then((res) => {
      if (res.data.status === "signup") {
        navigate("/signup");
      }
    });
  }, []);
};
