export type StoryRequestBody = {
  readingLevel: string;
  location: string;
  readingTime: number;
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
  readingLevel: string;
}

export interface updatedProfileRequestBody {
  id: number;
  userId: number;
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
  email: string;
  password: string;
}