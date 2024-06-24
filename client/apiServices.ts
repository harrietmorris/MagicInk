import axios from "axios";

const baseURL = 'http://localhost:3000';

export const getStoryById = async (id: string) => {
  try {
    const res = await axios.get(`${baseURL}/stories/${id}`);
    console.log("🚀 ~ getStoryById ~ res:", res)
    return res;
  } catch (error) {
    console.log("🚀 ~ getStoryById ~ error:", error)
    return error;
  }
}