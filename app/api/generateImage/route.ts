import openai from "@/openai";
import { NextResponse } from "next/server";

/**
 * TODO: Original endpoint - comment this function and uncomment the bellow one if you want bypass createImage
 */
/****/
export async function POST(request: Request) {
  const res = await request.json(); // now response contains body
  const prompt = res.prompt;
  // "Vytvor obrázok hlavy psa rhodesian ridgeback, ktorý drží v papuli kosť a v hornej časti bude červený nápis POZOR PES!. Bude to detailná maľba pastelom.";

  // Communicate with openAI DALL-E

  const response = await openai.createImage({
    prompt: prompt,
    n: 1,
    size: "256x256",
  });

  const image_url = response.data.data[0].url
    ? response.data.data[0].url
    : "NOURL";

  return NextResponse.json({
    url: image_url,
  });
}
/****/

/**
 * TODO: DALL-E Bypass endpoint with local test file - COMMENTED FOR NOW
 */
/****
export async function POST(request: Request) {
  const res = await request.json(); // now response contains body
  const prompt = res.prompt;
  // const image_url =
  // "https://www.tajchy.sk/files/images/hubertove_dni/sv_hubert_legend_m.jpg";

  const image_url = "http://localhost:3000/test-img.jpg";
  return NextResponse.json({
    url: image_url,
  });
}
***/
