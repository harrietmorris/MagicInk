export type StoryRequestBody = {
  readingLevel: string;
  location: string;
  readingTime: number;
  themes: string;
  chooseYourStory: boolean;
  breakpoints: number;
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
  readingLevel: string;
  location: string;
  themes: string;
  chooseYourStory: boolean;
  currentBreakpoint: number;
  breakpoints: number;
}


export interface LoginRequestBody {
  id: string;
  email: string;
  givenName: string;
  familyName: string;
  name: string;
  photo: string | null;
}