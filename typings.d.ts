interface GeneratedImage {
  $id: string;
  $createdAt: string;
  imageUrl: string;
  imagePrompt: string;
  imageTimestamp: string;
  image?: GeneratedImageFile;
}

interface GeneratedImageFile {
  bucketId: string;
  fileId: string;
}

type ImageType = {
  name: string;
  url: string;
};
