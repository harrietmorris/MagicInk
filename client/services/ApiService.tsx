import { ProfileType, StoryType, UserType } from "../Types"
import axios, {AxiosResponse} from "axios"; 

const API_URL = 'http://localhost:3000' //this may need to change to IP address

export const axiosUser = async (id: number): Promise<UserType> => {
    try {
        const response: AxiosResponse<UserType> = await axios.get(`${API_URL}/users/${id}`);
        console.log('getting user:', response.data)
        return response.data
    } catch (e) {
        console.log('error getting user', e)
        throw e
    }
} 

export const axiosAllProfiles = async (userId: number): Promise<ProfileType[]> => {

}

export const axiosSelectedProfile = async (profileId: number): Promise<ProfileType> => {

}

export const axiosStoriesByProfile = async (profileId: number): Promise<StoryType[]> => { }

export const axiosSelectedStory = async (storyId: number): Promise<StoryType> => { }

export const axiosFavStories = async (profileId: number): Promise<StoryType[]> => { }