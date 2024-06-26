export type StoryRequestBody = {
  readingLevel: string;
  location: string;
  readingTime: number;
  themes: string[];
  simpleLanguage: boolean;
  words: number[];
};


export interface CreateProfileRequestBody {
  name: string;
  picture?: string;
  readingLevel: string;
}

export interface updatedProfileRequestBody {
  id: number;
  userId: string;
  name: string;
  picture?: string;
  readingLevel: string;
}

export interface CreateStoryRequestBody {
  title: string;
  storyString: string;
  prompt: string;
  model?: string;
  readingTime: number;
  themes: string[];
}


export interface LoginRequestBody {
  id: string;
  email: string;
  givenName: string;
  familyName: string;
  name: string;
  photo: string | null;
}