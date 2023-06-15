// import openai from "@/openai";
import { NextResponse } from "next/server";

/**
 * TODO: Original endpoint - COMMENTED FOR NOW

export async function GET(request: Request) {
  let out = openai;
  // Communicate with openAI GPT
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt:
      "Write a random text prompt for DALL-E to generate an image, this prompt will be shown to the user, include details such as the genre and what type of painting it should be, options can include: oil painting, watercolor, photo-realistic, 4K, aabstract, modern, black and white etc. Do not wrap answer in quotes.",
    max_tokens: 100,
    temperature: 0.8,
  });
  const responseText = response.data.choices[0].text;

  //return { body: responseText };
  return NextResponse.json(responseText);
 */

/**
 * TODO: Bypass endpoint - COMMENTED FOR NOW
 */
export async function GET(request: Request) {
  const responseText =
    "Create a old fashioned abstract oil painting of a city skyline at night";
  return NextResponse.json(responseText);
}
