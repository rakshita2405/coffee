import React, { useState, useEffect, useRef } from "react";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Hi! I'm your coffee shop assistant. How can I help you today?", sender: "bot" },
  ]);
  const [userInput, setUserInput] = useState("");
  const messagesEndRef = useRef(null); // Reference to scroll to bottom

  // Scroll to the bottom every time messages are updated
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (userInput.trim()) {
      // Add user message to the state
      setMessages([...messages, { text: userInput, sender: "user" }]);

      // Fetch the bot response from the backend API
      const botResponse = await getBotResponseFromAPI(userInput);

      // Update the messages state with bot response
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: botResponse, sender: "bot" },
      ]);

      setUserInput(""); // Clear input field
    }
  };

  // Fetch bot response from backend API
  const getBotResponseFromAPI = async (userInput) => {
    try {
      const response = await fetch("http://localhost:8080/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userInput }),
      });

      const data = await response.json();
      return data.response; // Return the response from backend
    } catch (error) {
      console.error("Error fetching bot response:", error);
      return "Sorry, there was an issue with the server. Please try again later.";
    }
  };

  return (
    <div style={styles.chatContainer}>
      <div style={styles.messagesContainer}>
        {messages.map((msg, index) => (
          <div key={index} style={msg.sender === "bot" ? styles.botMessage : styles.userMessage}>
            {msg.text}
          </div>
        ))}
        {/* Scroll to the latest message */}
        <div ref={messagesEndRef} />
      </div>
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        style={styles.input}
        placeholder="Type your message..."
      />
      <button onClick={handleSendMessage} style={styles.button}>
        Send
      </button>
    </div>
  );
};

const styles = {
  chatContainer: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    width: "300px",
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "10px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  },
  messagesContainer: {
    maxHeight: "200px",
    overflowY: "scroll",
    marginBottom: "10px",
  },
  botMessage: {
    backgroundColor: "#f1f1f1",
    padding: "8px",
    borderRadius: "10px",
    margin: "5px 0",
  },
  userMessage: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "8px",
    borderRadius: "10px",
    margin: "5px 0",
    textAlign: "right",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: "10px",
    marginTop: "5px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Chatbot;
