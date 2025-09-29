import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000"); // Server ka URL

const Forum = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      setChat((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit("sendMessage", message);
      setMessage("");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">💬 Anonymous Forum Chat</h1>

      <div className="bg-white p-4 rounded-md shadow-md mb-4 h-80 overflow-y-auto">
        {chat.map((msg, index) => (
          <p key={index} className="mb-2 text-gray-700">🧑‍💬 {msg}</p>
        ))}
      </div>

      <form onSubmit={sendMessage} className="flex gap-2">
        <input
          type="text"
          className="flex-1 border rounded-md p-2"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-800">
          Send
        </button>
      </form>
    </div>
  );
};

export default Forum;
