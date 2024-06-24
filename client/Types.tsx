
export interface UserType {
    id: number;
    email: string;
    password: string;
  }

export interface ProfileType {
    id: number;
    userId: number;
    name: string;
    picture?: string | null;
    readLevel: number;
    favs: StoryType[];
    storiesList: StoryType[];
}

export interface StoryType {
    id: number;
    mainCharacter: string;
    storyString: string;
    prompt: string;
    model: string;
    rating: string;
    plots: string;
    readingTime: string;
    theme: string[];
}

export type FormData = {
    readingLevel: string[];
    location: string[];
    readingTime: string[];
    themes: string[];
};

export interface DataContextProps {
  user: UserType | null;
  setUser: (user: UserType | null) => void;

  createProfile: (userId: number, profileData: Omit<ProfileType, 'id' | 'userId'>) => void;
  getProfiles: (userId: number) => void;
  setProfiles: (profiles: ProfileType[]) => void;
  profiles: ProfileType[];
  setSelectedProfile: (profile: ProfileType) => void;
  selectedProfile: ProfileType | null;

  createStory: (profileId: number, storyData: Omit<StoryType, 'id'>) => void;
  getStories: (profileId: number) => void;
  stories: StoryType[];
  setStories: (story: StoryType[]) => void;
  setSelectedStory: (story: StoryType | null) => void;
  selectedStory: StoryType | null;

  getFavStories: (profileId: number) => void;
  favStories: StoryType[];
  setFavStories: (story: StoryType[]) => void;
  addToFavs: (profileId: number, storyId: number) => void;
}