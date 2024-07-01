export type StoryRequestBody = {
  readingLevel: string;
  location: string;
  readingTime: number;
  themes: string;
  chooseYourStory: boolean;
  breakpoints: number;
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
  readingLevel: string;
  location: string;
  themes: string;
  chooseYourStory: boolean;
  currentBreakpoint: number;
  breakpoints: number;
}


//TODO: Duplicate of above
export interface LoginRequestBody {
  email: string;
  password: string;
}

export interface getUserRequestBody {
  id: number;
  email: string;
  password: string;

}