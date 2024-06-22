export type StoryRequestBody = {
  age: string;
  location: string;
  readingTime: string;
  themes: string[];
  simpleLanguage: boolean;
  words: number[];
};


export interface CreateUserRequestBody {
  email: string;
  password: string;
}

export interface CreateProfileRequestBody {
  name: string;
  picture?: string;
  readLev: number;
}

export interface CreateStoryRequestBody {
  theme: string[];
  mainCharacter?: string;
  storyString?: string;
  prompt?: string;
  model?: string;
  rating?: number;
  plots?: string;
  readingTime?: number;
}

export interface LoginRequestBody {
  email: string;
  password: string;
}