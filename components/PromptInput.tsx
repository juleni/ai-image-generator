"use client";

import { databases, ID } from "@/appwrite";
import fetchSuggestionFromChatGPT from "@/lib/fetchSuggestionFromChatGPT";
import uploadImage from "@/lib/uploadImage";
import axios from "axios";
import { FormEvent, useState } from "react";
import useSWR from "swr";

function PromptInput() {
  const [input, setInput] = useState("");
  //const [images, setImages] = useState<Array>([]);

  const {
    data: suggestion,
    isLoading,
    mutate,
    isValidating,
  } = useSWR("/api/generateSuggestion", fetchSuggestionFromChatGPT, {
    revalidateOnFocus: false,
  });

  const loading = isLoading || isValidating;

  const submitPrompt = async (useSuggestion?: boolean) => {
    console.log("******************** submitPrompt");
    const inputPrompt = input;
    setInput("");

    // promptGenImage is the prompt to send to API
    const promptGenImage = useSuggestion ? suggestion : inputPrompt;
    const res = await fetch("/api/generateImage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: promptGenImage }),
    });

    const data = await res.json();
    console.log("-------- DATA");
    console.log(data);

    /****
    * TODO: Version running getImage API and should return new image File object. 
    *       But returns empty jason value
    *       This version was created becouse of CORS
    // data.url is the url to send to API
    const resImg = await fetch("/api/getImage?url=" + data.url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      // body: JSON.stringify({ url: data.url }), // set image url to the body
    });
    const dataImg = await resImg;
    console.log("****** resImg:");
    console.log(resImg);
*****/

    /*

    console.log("****** dataImg:");
    console.log(dataImg);
    console.log("******");
    console.log("****** arrayBuffer:");
    const arrayBuffer = await dataImg.arrayBuffer();
    console.log("****** arrayBuffer:");
    console.log(arrayBuffer);
*/

    const responseImage = await axios.get(data.url, {
      responseType: "arraybuffer",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
    console.log("----responseImage----");
    console.log(responseImage);
    const arrayBuffer = responseImage.data;

    //const arrayBuffer = await resImg.arrayBuffer();
    console.log("****** arrayBuffer:");
    console.log(arrayBuffer);
    // Generate filename based on timestamp and inserted prompt
    const timestamp = new Date().getTime();
    const file_name = `${timestamp}_${promptGenImage}.jpg`;
    const imgFile = new File([arrayBuffer], file_name, {
      type: "image/jpeg",
    });

    let generatedFileFromDB = null;
    // upload image into appwrite storage
    if (imgFile) {
      const fileUploaded = await uploadImage(imgFile);
      if (fileUploaded) {
        generatedFileFromDB = {
          bucketId: fileUploaded.bucketId,
          fileId: fileUploaded.$id,
        };
        console.log(generatedFileFromDB);
      } else {
        console.log("Image not uploaded");
      }
    }

    // Create image document in appwrite DB
    const { $id } = await databases.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_IMAGE_COLLECTION_ID!,
      ID.unique(),
      {
        imageUrl: file_name,
        imagePrompt: promptGenImage,
        imageTimestamp: timestamp.toString(),
        // include image if exists
        ...(generatedFileFromDB && {
          image: JSON.stringify(generatedFileFromDB),
        }),
      }
    );
  };

  const handleSumbit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await submitPrompt();
  };

  return (
    <div className="m-10">
      <form
        onSubmit={handleSumbit}
        className="flex flex-col lg:flex-row shadow-md shadow-slate-400/10 border rounded-md lg:divide-x"
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            (loading && "ChatGPT is thinking of a suggestion...") ||
            suggestion ||
            "Enter a prompt..."
          }
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
          onClick={mutate}
          className="p-4 text-violet-500 border-none transition-colors duration-200 
        font-bold rounded-b-md md:rounded-bl-none"
        >
          New Suggestion
        </button>
      </form>
      {input && (
        <p className="italic p-2 font-light">
          Suggestion from Chat GPT:{" "}
          <span className="text-violet-500 block">
            {!loading && suggestion}
          </span>
        </p>
      )}
    </div>
  );
}

export default PromptInput;
