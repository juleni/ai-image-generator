"use client";

import { databases, ID } from "@/appwrite";
import fetchImagesFormDB from "@/lib/fetchImagesFromDB";
import fetchSuggestionFromChatGPT from "@/lib/fetchSuggestionFromChatGPT";
import uploadImage from "@/lib/uploadImage";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
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

  const { mutate: updateImages } = useSWR("images", fetchImagesFormDB, {
    revalidateOnFocus: false,
  });

  const loading = isLoading || isValidating;

  const submitPrompt = async (useSuggestion?: boolean) => {
    const inputPrompt = input;
    setInput("");

    // promptGenImage is the prompt to send to API
    const promptGenImage = useSuggestion ? suggestion : inputPrompt;

    const notificationPrompt = promptGenImage;
    const notificationPromptShort = notificationPrompt.slice(0, 20);
    const notification = toast.loading(
      `DALL-E is crating: ${notificationPromptShort} ...`
    );

    // generate Image from DALL-E and return url of generated image
    const generatedImageResponse = await fetch("/api/generateImage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: promptGenImage }),
    });

    const generatedImageData = await generatedImageResponse.json();
    console.log("-------- DATA");
    console.log(generatedImageData);

    if (generatedImageData.error) {
      toast.error(generatedImageData.error);
    } else {
      toast.success("Your AI Art has been generated successfully", {
        id: notification,
      });
    }

    // Get image file from the url
    const resImg = await fetch("/api/getImage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ url: generatedImageData.url }), // set image url to the body
    });
    const arrayBuffer = await resImg.arrayBuffer();

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

    updateImages();
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
          onClick={() => submitPrompt(true)}
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
