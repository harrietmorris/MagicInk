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
  readingLevel: string;
  favs: StoryType[];
  storiesList: StoryType[];
}

export interface StoryType {
  id: number;
  title: string;
  storyString: string;
  prompt: string;
  model?: string;
  readingTime: number;
  themes: string[];
}

export type FormData = {
  readingLevel: string[];
  location: string[];
  readingTime: string[];
  themes: string[];
};

export interface DataContextProps {
  //TODO: remove nulls when app is working
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;

  profiles: ProfileType[];
  setProfiles: React.Dispatch<React.SetStateAction<ProfileType[]>>;

  selectedProfile: ProfileType | null;
  setSelectedProfile: React.Dispatch<React.SetStateAction<ProfileType | null>>;

  allStories: StoryType[];
  setAllStories: React.Dispatch<React.SetStateAction<StoryType[]>>;

  selectedStory: StoryType | null;
  setSelectedStory: React.Dispatch<React.SetStateAction<StoryType | null>>;

  favStories: StoryType[];
  setFavStories: React.Dispatch<React.SetStateAction<StoryType[]>>;
}
