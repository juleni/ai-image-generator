import { databases, storage } from "@/appwrite";
const fetchImagesFormDB = async () => {
  console.log("************** fetchImagesFormDB START");

  const arrImagesReturn = new Array<ImageType>();
  // get data from DB
  const imgObjectData = await databases.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_IMAGE_COLLECTION_ID!
  );
  console.log("------------imgObjectData--- ");
  console.log(imgObjectData);
  var x = 1;
  imgObjectData.documents.forEach((element) => {
    // 'image' attribute contains JSON with bucketId and fileId of the image from storage
    const imgJSON = JSON.parse(element.image);
    // console.log("imgJSON: " + x++);
    // console.log(imgJSON);

    // get image Url from appwrite storage based on fileId and bucketId
    const imageUrl = storage.getFilePreview(
      process.env.NEXT_PUBLIC_APPWRITE_IMAGES_BUCKET_ID!,
      imgJSON.fileId
    );
    //console.log("imageUrl: " + x++);
    //console.log(imageUrl);

    arrImagesReturn.push({
      name: element.imagePrompt,
      url: imageUrl.toString(),
    });
    element.imageUrl = imageUrl;
    //console.log("element: " + x++);
    //console.log(element);
    /*
    console.log("--- imageUrl : " + x);
    console.log(imageUrl.href);
    console.log("--- arrImagesReturn : " + x);
    console.log(arrImagesReturn);
*/
  });

  /*
  const imgFileData = await storage.listFiles(
    process.env.NEXT_PUBLIC_APPWRITE_IMAGES_BUCKET_ID!
  );

  const images = imgObjectData.documents;

  console.log("---- images:");
  console.log(images);
  console.log("---- files:");
  console.log(imgFileData);
*/
  console.log("************** fetchImagesFormDB END");
  return arrImagesReturn;
};

export default fetchImagesFormDB;
