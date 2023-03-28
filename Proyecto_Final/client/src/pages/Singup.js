import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const [data, setData] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    passwordCheck: "",
    phone: "",
    address: "",
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

    axios.post("http://localhost:8000/signup", data).then((res) => {
      if (res.status === 200) {
        navigate("/login");
      }
    });
  };
  return (
    <div className="form" onSubmit={handleSubmit}>
      <form>
        <div className="input-container">
          <label>Name </label>
          <input type="text" name="name" value={data.name} onChange={handleChange} required />
        </div>
        <div className="input-container">
          <label>Lastname </label>
          <input type="text" name="lastname" value={data.lastname} onChange={handleChange} required />
        </div>
        <div className="input-container">
          <label>email </label>
          <input type="email" name="email" value={data.email} onChange={handleChange} required />
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="password" value={data.password} onChange={handleChange} required />
        </div>
        <div className="input-container">
          <label>Password Confirmation </label>
          <input type="password" name="passwordCheck" value={data.passwordCheck} onChange={handleChange} required />
        </div>
        <div className="input-container">
          <label> Phone </label>
          <input type="number" name="phone" value={data.phone} onChange={handleChange} required />
        </div>
        <div className="input-container">
          <label> Address </label>
          <input type="text" name="address" value={data.address} onChange={handleChange} required />
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );
};
