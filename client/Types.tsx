import { StringLiteral } from "@babel/types";

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