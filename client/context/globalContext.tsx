import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { ProfileType, StoryType, UserType, DataContextProps } from "../Types";
import { axiosAllProfiles, axiosFavStories, axiosSelectedProfile, axiosSelectedStory, axiosStoriesByProfile, axiosUser } from "@/services/ApiService";


type ProviderProps = {
    children: ReactNode;
};

const initialDataContext: DataContextProps = {
    user: null,
    setUser: () => {},

    createProfile: () => {},
    getProfiles: () => {},
    setProfiles: () => {},
    profiles: [],
    setSelectedProfile: () => {},
    selectedProfile: null,

    createStory: () => {},
    getStories: () => {},
    stories: [],
    setStories: () => {},
    setSelectedStory: () => {},
    selectedStory: null,

    getFavStories: () => {},
    favStories: [],
    setFavStories: () => {},
    addToFavs: () => {},
};

const dataContext = createContext<DataContextProps> (initialDataContext);

export const getUserProvider = ({children}: ProviderProps) => {
    const [user, setUser] = useState<UserType | null >(null);
    const [profiles, setProfiles] = useState<ProfileType[]>([]);
    const [selectedProfile, setSelectedProfile] = useState<ProfileType | null>(null);
    const [stories, setStories] = useState<StoryType[]>([]);
    const [selectedStory, setSelectedStory] = useState<StoryType | null>(null);
    const [favStories, setFavStories] = useState<StoryType[]>([]);



    const getUser = async (id: number) => {
        try {
            const data = await axiosUser(id); //not sure if this dynamic part is correct?
                setUser(data);
                console.log('setting user data to:', data)
        } catch (e) {
            console.log('Error updating user:', e);
        }
    }

    const getAllProfiles = async (id: number) => {
        try {
            const data = await axiosAllProfiles(id); //not sure if this dynamic part is correct?
            setProfiles(data);
            console.log('setting all profiles data to:', data)
        } catch (e) {
            console.error('Error updating profiles:', e);
        }
    }

    const getSelectedProfile = async (profileId: number) => {
        try {
            const data = await axiosSelectedProfile(profileId); //not sure if this dynamic part is correct?
            setSelectedProfile(data);
            console.log('setting selected profile data to:', data)
        } catch (e) {
            console.error('Error updating selected profile:', e);
        }
    }

    const getAllStories = async (profileId: number) => {
        try {
            const data = await axiosStoriesByProfile(profileId);
            setStories(data);
            console.log('setting selected profile stories data to:', data)
        } catch (e) {
            console.error('Error updating all stories:', e);
        }
    }

    const getSelectedStory = async (storyId: number) => {
        try {
            const data = await axiosSelectedStory(storyId);
            setSelectedStory(data);
            console.log('setting selected story data to:', data)
        } catch (e) {
            console.error('Error updating selected story:', e);
        }
    }

    const getFavStories = async (profileId: number) => {
        try {
            const data = await axiosFavStories(profileId);
            setFavStories(data);
            console.log('setting fav stories data to:', data)
        } catch (e) {
            console.error('Error updating fav stories:', e);
        }
    }


    return (
        <dataContext.Provider value={{
            user,
            setUser,
            profiles,
            setProfiles,
            selectedProfile,
            setSelectedProfile,
            stories,
            setStories,
            selectedStory,
            setSelectedStory,
            favStories,
            setFavStories,

         }}>
            {children}
        </dataContext.Provider>
    );
};

export const useDataContext = () => {
    const context = useContext(dataContext);
    console.log('accessing context');
    if (context === undefined) {
        throw new Error ('context must be used within a provider')
    }
    return context;
}