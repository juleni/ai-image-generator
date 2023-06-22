import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request: Request, response: Response) {
  const resImage = await request.json(); // now response contains body
  const imageUrl = resImage.url;

  // get image file from image url
  const responseImage = await axios.get(imageUrl, {
    responseType: "arraybuffer",
    headers: {
      "Content-Type": "image/jpeg",
      "Access-Control-Allow-Origin": "*",
    },
  });

  const arrayBuffer = await responseImage.data;

  return new NextResponse(arrayBuffer, {
    headers: {
      "Content-Type": "image/jpeg",
      "Access-Control-Allow-Origin": "*",
      ...response.headers, // copy the previous headers
    },
  });
}
