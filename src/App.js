import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { FaRegMessage } from "react-icons/fa6";

import "./App.css";

const socket = io("http://localhost:3000");

const App = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Listen for messages from the server
    socket.on("receiveMessage", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("sendMessage", message);
      setMessage(""); // Clear the input field after sending
    }
  };

  return (
    <div>
      <div className="flex items-center text-lg text-white font-bold rounded-md p-4 bg-blue-500 sticky top-0 z-[999]">
        <FaRegMessage className="text-2xl me-2" /> Apps Square ChatBot
      </div>
      <div className="flex-1 overflow-auto py-4 px-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 1, , 2, 3, 5, 4].map((msg, index) => (
          <div
            key={index}
            className={`p-2 mb-2 rounded-lg max-w-sm ${
              msg.isSender ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {/* {msg.text} */}
            <p>gffdgbdbtfbfdbdfbfd</p>
          </div>
        ))}
      </div>
      <div className="flex items-center mt-2 py-2 px-0 border-t bg-white sticky bottom-0 z-[999]">
        <input
          type="text"
          className="flex-1 p-3 border-none bg-gray-200 rounded-md"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className="ml-2 p-3 bg-blue-500 text-white rounded-md border-none cursor-pointer"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default App;
