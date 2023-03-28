import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post("http://localhost:8000/login", data).then((res) => {
      if (!res.data) {
        navigate("/signup");
      } else {
        navigate("/api/products");
      }
      console.log(res.status, res.data);
    });
  };
  return (
    <div className="form" onSubmit={handleSubmit}>
      <form>
        <div className="input-container">
          <label>email </label>
          <input type="email" name="email" value={data.email} onChange={handleChange} required />
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="password" value={data.password} onChange={handleChange} required />
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );
};
