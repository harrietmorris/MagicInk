import { PrismaClient, Prisma, User as PrismaUser, Profile as PrismaProfile, Story as PrismaStory } from '@prisma/client';

const prisma = new PrismaClient();

export interface User extends PrismaUser {
  id: number;
  email: string;
  password: string;
  profiles: Profile[];
}

export interface Profile {
  id: number;
  userId: number;
  name: string;
  picture?: string | null;
  readLev: number;
  user: User;
  storiesList: Story[];
  favs: Story[];
}

export interface Story {
  id: number;
  theme?: string[] | null;
  mainCharacter?: string | null;
  storyString?: string | null;
  prompt?: string | null;
  model?: string | null;
  rating?: number | null;
  plots?: string | null;
  readingTime?: number | null;
  profiles: Profile[];
  favs: Profile[];
}

export async function createUser(data: Prisma.UserCreateInput): Promise<User> {
  return await prisma.user.create({
    data,
    include: {
      profiles: true,
    },
  });
}

export async function createProfile(data: Prisma.ProfileCreateInput): Promise<Profile> {
  return await prisma.profile.create({
    data,
    include: {
      user: true,
      storiesList: true,
      favs: true,
    },
  });
}

export async function createStory(data: Prisma.StoryCreateInput): Promise<Story> {
  return await prisma.story.create({
    data,
    include: {
      profiles: true,
      favs: true,
    },
  });
}

export async function getUserProfilesAndStories(userId: number): Promise<User | null> {
  return await prisma.user.findUnique({
    where: { id: userId },
    include: {
      profiles: {
        include: {
          stories: true,
          favs: true,
        },
      },
    },
  });
}

export async function addStoryToFavorites(profileId: number, storyId: number): Promise<Profile> {
  return await prisma.profile.update({
    where: { id: profileId },
    data: {
      favs: {
        connect: { id: storyId },
      },
    },
    include: {
      favs: true,
    },
  });
}

export async function disconnect(): Promise<void> {
  await prisma.$disconnect();
}