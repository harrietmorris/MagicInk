import { ReactNode, createContext, useContext, useState } from 'react';
import { ProfileType, StoryType, UserType, DataContextProps } from '../Types';

type ProviderProps = {
  children: ReactNode;
};

// const initialDataContext: DataContextProps = {
//   user: null,
//   setUser: () => {},

//   createProfile: () => {},
//   getProfiles: () => {},
//   setProfiles: () => {},
//   profiles: [],
//   setSelectedProfile: () => {},
//   selectedProfile: null,

//   createStory: () => {},
//   getStories: () => {},
//   stories: [],
//   setStories: () => {},
// //   setSelectedStory: null,
//   selectedStory: null,

//   getFavStories: () => {},
//   favStories: [],
//   setFavStories: () => {},
//   addToFavs: () => {},

// //   getSelectedStory: () => {}
// };

const dataContext = createContext<DataContextProps | null>(null);

export const getUserProvider = ({ children }: ProviderProps) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [profiles, setProfiles] = useState<ProfileType[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<ProfileType | null>(null);
  const [allStories, setAllStories] = useState<StoryType[]>([]);
  const [selectedStory, setSelectedStory] = useState<StoryType | null>(null);
  const [favStories, setFavStories] = useState<StoryType[]>([]);

  return (
    <dataContext.Provider
      value={{
        user,
        setUser,
        profiles,
        setProfiles,
        selectedProfile,
        setSelectedProfile,
        allStories,
        setAllStories,
        selectedStory,
        setSelectedStory,
        favStories,
        setFavStories,
      }}
    >
      {children}
    </dataContext.Provider>
  );
};

export const useDataContext = () => {
  const context = useContext(dataContext);
  console.log('accessing context');
  if (context === undefined) {
    throw new Error('context must be used within a provider');
  }
  return context;
};
