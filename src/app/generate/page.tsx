"use client";
import { useState, useEffect } from "react";
import { chatSession } from "../../utils/AiModal";

const Generate = () => {
  const [prompt, setPrompt] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [aiOutput, setAiOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    } else {
      setPreview("");
    }
  }, [file]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const GenerateAIContent = async () => {
    setLoading(true);
    try {
      const SelectedPrompt = prompt;
      const FinalAiPrompt = JSON.stringify(file) + "," + SelectedPrompt;

      const result = await chatSession.sendMessage(FinalAiPrompt);
      const aiResponse = await result.response.text();

      setAiOutput(aiResponse);
    } catch (error) {
      console.error("Error generating AI content:", error);
      setAiOutput("");
      setError("Failed to generate AI content. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(aiOutput);
    alert("AI output copied to clipboard!");
  };

  return (
    <div className="w-full max-w-[1200px] h-[570px] bg-gray-300 flex items-stretch flex-col gap-12 py-14 px-10">
      <div className="max-w-[600px] rounded-lg shadow-md py-2 px-2 flex self-start bg-white text-black font-bold">
        I can help with your assignment. Give me your assignment
      </div>
      <div className="w-[800px] flex rounded-lg shadow-md py-2 px-2 self-end bg-white text-black font-bold gap-4">
        <textarea
          className="w-full h-full outline-none bg-gray-300 p-2 rounded-lg resize-none no-scrollbar"
          rows={3}
          placeholder="Type here..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
      </div>
      <div className="max-w-[600px] rounded-lg shadow-md py-2 px-2 flex self-start bg-white text-black font-bold">
        {error ? <div className="text-red-600">{error}</div> : null}
        <pre>{aiOutput ? aiOutput : "AI Output"}</pre>
      </div>
      <div className="max-w-[600px] rounded-lg shadow-md py-2 px-2 flex self-start bg-white text-black font-bold">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={GenerateAIContent}
          disabled={!prompt || loading}
        >
          {loading ? "Generating..." : "Generate AI Content"}
        </button>
        {aiOutput && (
          <button
            className="ml-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={copyToClipboard}
          >
            Copy Output
          </button>
        )}
      </div>
    </div>
  );
};

export default Generate;
