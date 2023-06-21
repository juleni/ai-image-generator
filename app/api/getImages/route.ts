import fetchImagesFormDB from "@/lib/fetchImagesFromDB";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const imagesFromDB = await fetchImagesFormDB();
  return NextResponse.json(imagesFromDB);
}
