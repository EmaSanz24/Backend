import axios from "axios";
import { useEffect, useState } from "react";
//import SocketIO from "socket.io-client";
import { Message } from "../components/Message/Message.js";

export const Chat = () => {
  const [message, setMessage] = useState();
  // const socket = SocketIO.connect("http://localhost:8000");

  useEffect(() => {
    axios.get("http://localhost:8000/api/chat").then((res) => {
      setMessage(res.data);
    });
  }, []);
  return (
    <div>
      {message.map((m) => {
        <Message data={m} />;
      })}
    </div>
  );
};
