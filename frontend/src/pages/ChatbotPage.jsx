import {
  useState,
  useRef,
  useEffect,
} from "react";

import { useNavigate } from "react-router-dom";
import { sendMessage } from "../services/chatbotService";

function ChatbotPage() {
  const navigate = useNavigate();

  const disease =
    localStorage.getItem("selectedDisease") ||
    "dengue";

  const chatEndRef = useRef(null);

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const getTime = () => {
    return new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      time: getTime(),
      text: `Welcome to HealthBridge AI.

You selected ${disease.toUpperCase()}.

You can ask about:
• Symptoms
• Prevention
• Treatment
• Risk Factors
• Warning Signs`,
    },
  ]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  const suggestedQuestions = {
    dengue: [
      "What are the symptoms of dengue?",
      "How can dengue be prevented?",
      "What are dengue warning signs?",
    ],
    diabetes: [
      "What causes diabetes?",
      "How is diabetes managed?",
      "What foods should diabetics avoid?",
    ],
    tuberculosis: [
      "What are the symptoms of tuberculosis?",
      "How is tuberculosis treated?",
      "How can TB be prevented?",
    ],
  };

  const handleSend = async (
    customMessage = null
  ) => {
    const text =
      customMessage || message;

    if (!text.trim()) return;

    const userMessage = {
      sender: "user",
      text,
      time: getTime(),
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    setMessage("");
    setLoading(true);

    try {
      const botResponse =
        await sendMessage(
          disease,
          text
        );

      const botMessage = {
        sender: "bot",
        text: botResponse,
        time: getTime(),
      };

      setMessages((prev) => [
        ...prev,
        botMessage,
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text:
            "Sorry, I encountered an error while processing your request.",
          time: getTime(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
  };

  const diseaseColor =
    disease === "dengue"
      ? "text-red-600"
      : disease === "diabetes"
      ? "text-blue-600"
      : "text-green-600";

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <div className="bg-white shadow px-8 py-4 flex justify-between items-center">

        <div>

          <h1
            className={`text-3xl font-bold ${diseaseColor}`}
          >
            HealthBridge AI
          </h1>

          <p className="text-gray-500">
            Disease Selected:{" "}
            <span className="font-semibold capitalize">
              {disease}
            </span>
          </p>

        </div>

        <button
          onClick={() =>
            navigate("/dashboard")
          }
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
        >
          Dashboard
        </button>

      </div>

      <div className="max-w-6xl mx-auto p-6">

        {/* Suggested Questions */}
        <div className="bg-white rounded-xl shadow p-4 mb-4">

          <h2 className="font-bold mb-3">
            Suggested Questions
          </h2>

          <div className="flex flex-wrap gap-2">

            {suggestedQuestions[
              disease
            ]?.map(
              (question, index) => (
                <button
                  key={index}
                  onClick={() =>
                    handleSend(
                      question
                    )
                  }
                  className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full hover:bg-purple-200"
                >
                  {question}
                </button>
              )
            )}

          </div>

        </div>

        {/* Chat Box */}
        <div className="bg-white rounded-xl shadow h-[650px] flex flex-col">

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">

            {messages.map(
              (msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.sender === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >

                  <div
                    className={`max-w-[75%] px-4 py-3 rounded-xl ${
                      msg.sender === "user"
                        ? "bg-purple-600 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >

                    <div className="text-xs opacity-70 mb-2">
                      {msg.time}
                    </div>

                    <div className="whitespace-pre-wrap">
                      {msg.text}
                    </div>

                    {msg.sender ===
                      "bot" && (
                      <button
                        onClick={() =>
                          copyText(
                            msg.text
                          )
                        }
                        className="mt-3 text-sm text-blue-600"
                      >
                        📋 Copy
                      </button>
                    )}

                  </div>

                </div>
              )
            )}

            {loading && (
              <div className="flex justify-start">

                <div className="bg-gray-200 px-4 py-3 rounded-xl">

                  <div className="animate-pulse">
                    🤖 HealthBridge AI is thinking...
                  </div>

                </div>

              </div>
            )}

            <div ref={chatEndRef}></div>

          </div>

          {/* Input */}
          <div className="border-t p-4 flex gap-3">

            <input
              type="text"
              placeholder="Ask a healthcare question..."
              value={message}
              disabled={loading}
              onChange={(e) =>
                setMessage(
                  e.target.value
                )
              }
              onKeyDown={(e) => {
                if (
                  e.key === "Enter"
                ) {
                  handleSend();
                }
              }}
              className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <button
              onClick={handleSend}
              disabled={loading}
              className="bg-purple-600 text-white px-8 rounded-lg hover:bg-purple-700 disabled:opacity-50"
            >
              Send
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ChatbotPage;