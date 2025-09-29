import React, { useState } from "react";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! How can I support your mental wellness today? 😊" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await fetch("https://mind-mend-final-backend.onrender.com/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      const botReply = { sender: "bot", text: data.reply };
      setMessages((prev) => [...prev, botReply]);
    } catch (err) {
      console.error("Chatbot error:", err);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "❌ Server not responding. Try again later." },
      ]);
    }

    setInput("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-purple-200 flex flex-col justify-center items-center py-10">
      <div className="bg-white rounded-3xl shadow-lg w-full max-w-md p-6 flex flex-col space-y-4">
        <h2 className="text-2xl font-bold text-purple-700 text-center">MindMend Chatbot</h2>

        <div className="h-72 overflow-y-auto space-y-3 bg-purple-50 p-3 rounded-lg">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`p-2 rounded-lg max-w-xs ${
                msg.sender === "bot"
                  ? "bg-purple-200 text-purple-800 self-start"
                  : "bg-purple-600 text-white self-end"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        <div className="flex space-x-2">
          <input
            className="flex-1 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-purple-400 outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
          />
          <button
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
            onClick={handleSend}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
