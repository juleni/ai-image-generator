import { databases, storage } from "@/appwrite";
const fetchImagesFormDB = async () => {
  const arrImagesReturn = new Array<ImageType>();
  // get data from DB
  const imgObjectData = await databases.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_IMAGE_COLLECTION_ID!
  );
  imgObjectData.documents.forEach((element) => {
    // 'image' attribute contains JSON with bucketId and fileId of the image from storage
    const imgJSON = JSON.parse(element.image);

    // get image Url from appwrite storage based on fileId and bucketId
    const imageUrl = storage.getFilePreview(
      process.env.NEXT_PUBLIC_APPWRITE_IMAGES_BUCKET_ID!,
      imgJSON.fileId
    );

    arrImagesReturn.unshift({
      name: element.imagePrompt,
      url: imageUrl.toString(),
    });
    element.imageUrl = imageUrl;
  });

  /*
  // Get all files from appwrite storage
  const imgFileData = await storage.listFiles(
    process.env.NEXT_PUBLIC_APPWRITE_IMAGES_BUCKET_ID!
  );
  */
  return arrImagesReturn;
};

export default fetchImagesFormDB;
