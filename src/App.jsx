import React, { useState } from "react";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async () => {
    if (!query.trim()) return;

    setLoading(true);

    try {
      const apiKey = "AIzaSyBBUSRlIx1Wuo1sUm3SUpaNzgjTdEZJLZg";
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

      const payload = {
        contents: [
          {
            parts: [{ text: query }],
          },
        ],
      };

      const result = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await result.json();
      console.log(data);
      const generatedText =
        data.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";

      const pointWiseResponse = generatedText
        .split("\n")
        .filter((line) => line.trim()) 
        .map((line, index) => `${index + 1}. ${line.trim()}`)
        .join("\n");

      setMessages((prev) => [
        ...prev,
        { query, response: pointWiseResponse },
      ]);
      setQuery("");
    } catch (error) {
      console.error("Error generating response:", error);
      setMessages((prev) => [
        ...prev,
        { query, response: "An error occurred. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([]);
  };

  return (
    <div className="app-container">
      <h1>AI TalkMate</h1>
      <div className="query-container">
        <textarea
          placeholder="Talk to the Bot here..."
          value={query}
          onChange={handleQueryChange}
          className="query-input"
        ></textarea>
        <div className="button-container">
          <button onClick={handleSubmit} className="submit-button" disabled={loading}>
            {loading ? "Responding..." : "Respond"}
          </button>
          <button onClick={handleClear} className="clear-button">
            Clear
          </button>
        </div>
      </div>
      <div className="messages-container">
        {messages.map((msg, index) => (
          <div key={index} className="message-box">
            <p><strong>User:</strong> {msg.query}</p>
            <pre><strong>AI:</strong> {msg.response}</pre>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;