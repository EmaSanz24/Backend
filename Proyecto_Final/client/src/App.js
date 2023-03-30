import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Products } from "./pages/Products.js";
import { Detail } from "./pages/Detail.js";
import { Home } from "./Home.js";
import { Signup } from "./pages/Singup.js";
import { Login } from "./pages/Login.js";
import { Chat } from "./pages/Chat.js";
function App() {
  const [cookies, setCookie] = useCookies(["token"]);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/api/products" element={<Products />} />
          <Route path="/api/products/:id" element={<Detail cookie={cookies} />} />
          <Route path="/api/chat" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
