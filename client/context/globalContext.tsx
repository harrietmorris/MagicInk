import { ReactNode, createContext, useContext, useState } from 'react';
import { ProfileType, StoryType, UserType, DataContextProps } from '../types';

type ProviderProps = {
  children: ReactNode;
};

const initialDataContext: DataContextProps = {
  user: null,
  setUser: () => {},
  profiles: [],
  setProfiles: () => {},
  selectedProfile: null,
  setSelectedProfile: () => {},
  selectedStory: null,
  setSelectedStory: () => {},
  
};

//TODO: review the default state of the context -> currently no meaningful default so using null
const dataContext = createContext<DataContextProps>(initialDataContext);

export const GetUserProvider = ({ children }: ProviderProps) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [profiles, setProfiles] = useState<ProfileType[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<ProfileType | null>(null);
  const [selectedStory, setSelectedStory] = useState<StoryType | null>(null);
  

  return (
    <dataContext.Provider
      value={{
        user,
        setUser,
        profiles,
        setProfiles,
        selectedProfile,
        setSelectedProfile,
        // allStories,
        // setAllStories,
        selectedStory,
        setSelectedStory,
  
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
