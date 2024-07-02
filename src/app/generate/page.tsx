"use client";
import { useState } from "react";
import { chatSession } from "../../utils/AiModal";

const Generate = () => {
  const [prompt, setPrompt] = useState("");
  const [aiOutput, setAiOutput] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const GenerateAIContent = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setAiOutput((prev) => [...prev, `User: ${prompt}`]);

    try {
      const result = await chatSession.sendMessage(prompt);
      const aiResponse = await result.response.text();
      setAiOutput((prev) => [...prev, `AI: ${aiResponse}`]);
      setPrompt("");
    } catch (error) {
      console.error("Error generating AI content:", error);
      setError("Failed to generate AI content. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        Chat with AI
      </h1>
      <div className="flex flex-col space-y-4">
        <div className="bg-white p-4 rounded-lg shadow-inner h-96 overflow-y-auto">
          {aiOutput.map((message, index) => (
            <div
              key={index}
              className={`p-2 rounded-lg mb-2 ${
                message.startsWith("User:")
                  ? "bg-blue-200 self-end"
                  : "bg-gray-200 self-start"
              }`}
            >
              {message}
            </div>
          ))}
        </div>
        {error && <p className="text-red-600 text-center">{error}</p>}
        <textarea
          className="w-full p-3 border rounded-lg resize-none focus:outline-none"
          rows={3}
          placeholder="Type your message..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={GenerateAIContent}
          disabled={loading}
        >
          {loading ? "Generating..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default Generate;
