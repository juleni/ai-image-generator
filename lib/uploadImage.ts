import { ID, storage } from "@/appwrite";

const uploadImage = async (file: File) => {
  console.log("uploadImage INSIDE");
  if (!file) return;
  console.log("uploadImage file");
  console.log(file);

  console.log("--- storage.createFile START");

  const fileUploaded = await storage.createFile(
    "648b25bfea2b70193447",
    ID.unique(),
    file
  );
  console.log("--- storage.createFile END");
  return fileUploaded;
};

export default uploadImage;
