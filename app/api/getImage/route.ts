import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  console.log("****** GET IMAGE");
  // const res = await request.json(); // now response contains body
  // console.log(res);
  //const imageUrl = res.url;
  const wholeUrl = request.url;
  console.log("-----------");
  console.log(wholeUrl);
  console.log("-----------");
  const searchPattern = "?url=";
  const imageUrl = wholeUrl.substring(
    wholeUrl.indexOf(searchPattern) + searchPattern.length,
    wholeUrl.length
  );
  console.log("----------- searchPattern:");
  console.log(searchPattern);
  console.log("----------- index:");
  console.log(wholeUrl.indexOf(searchPattern) + searchPattern.length);
  console.log("----------- wholeUrl.length:");
  console.log(wholeUrl.length);

  console.log("----------- imageUrl:");
  console.log(imageUrl);
  console.log("-----------");

  const responseImage = await axios.get(imageUrl, {
    responseType: "arraybuffer",
  });
  console.log("****** GET IMAGE responseImage");
  //console.log(responseImage);

  const arrayBuffer = await responseImage.data;
  console.log("****** GET IMAGE arrayBuffer");
  console.log(arrayBuffer);
  const timestamp = new Date().getTime();

  const file_name = `${timestamp}_xxx.jpg`;
  const imgFile = new File([await arrayBuffer], file_name, {
    type: "image/jpeg",
  });
  console.log("imgFile");
  console.log(imgFile);

  console.log("****** GET IMAGE END");
  return NextResponse.json(imgFile);
}
