import { createImage } from "@/services/apiService";
import { storeStoryImage } from "@/services/apiStoryImage";
import { StoryType } from "@/types";

export const createAndStoreStoryImage = async (
  storyDetails: StoryType,
  readingLevel: string,
  location: string,
  themes: string,
) => {
  const image_url = await createImage(readingLevel, location, themes);
  const filename = `${storyDetails.id}.jpeg`;
  await storeStoryImage(image_url, filename);
};