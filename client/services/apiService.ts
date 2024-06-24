import axios, {isCancel, AxiosError} from 'axios';

const URL = 'http://localhost:3000';

async function createStory (
  readingLevel: string,
  location: string,
  readingTime: number,
  themes: string[],
  simpleLanguage: boolean = false,
  words: number[] = [],
) {
  try {
    const response = await axios.post(URL +'/story', {
      readingLevel,
      location,
      readingTime,
      themes,
      simpleLanguage,
      words,
    });
    return response.data;
  } catch (error) {
    console.error('Error creating story', error);
  }
}

const getStoryById = async (id: string) => {
  try {
    const response = await axios.get(`${URL}/stories/${id}`);
    console.log('🚀 ~ getStoryById ~ res:', response);
    return response.data;
  } catch (error) {
    console.error('Error creating story', error);
    return error;
  }
};

export { createStory, getStoryById };