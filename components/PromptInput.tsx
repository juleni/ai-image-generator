"use client";

import { useState } from "react";

function PromptInput() {
  const [input, setInput] = useState("");
  return (
    <div className="m-10">
      <form className="flex flex-col lg:flex-row shadow-md shadow-slate-400/10 border rounded-md lg:divide-x">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a prompt..."
          className="flex-1 p-4 outline-none rounded-md"
        />
        <button
          type="submit"
          disabled={!input}
          className={`p-4 font-bold ${
            input
              ? "bg-violet-500 text-white transition-colors duration-200 "
              : "text-gray-300 cursor-not-alowed"
          }`}
        >
          Generate
        </button>
        <button
          type="button"
          className="p-4 bg-violet-300 text-white duration-200 font-bold transition-colors
        disabled:text-gray-300 disabled:cursor-not-alowed disabled:bg-gray-400"
        >
          Use Suggestion
        </button>
        <button
          type="button"
          className="p-4 text-violet-500 border-none transition-colors duration-200 
        font-bold rounded-b-md md:rounded-bl-none"
        >
          New Suggestion
        </button>
      </form>
    </div>
  );
}

export default PromptInput;
