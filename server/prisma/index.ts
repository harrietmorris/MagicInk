import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();

interface User {
    id: number;
    email: string;
    password: string;
    profiles: Profile[];
  }
  
  interface Profile {
    id: number;
    userId: number;
    name: string;
    picture?: string | null;
    readLev: number;
    user: User;
    storiesList: Story[];
    favs: Story[];
  }
  
  interface Story {
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


  async function createUser(data: Prisma.UserCreateInput): Promise<User> {
    return await prisma.user.create({
      data,
      include: {
        profiles: true,
      },
    });
  }

  async function createProfile(data: Prisma.ProfileCreateInput): Promise<Profile> {
    return await prisma.profile.create({
      data,
      include: {
        user: true,
        storiesList: true,
        favs: true,
      },
    });
  }

  async function createStory(data: Prisma.StoryCreateInput): Promise<Story> {
    return await prisma.story.create({
      data,
      include: {
        profiles: true,
        favs: true,
      },
    });
  }

  async function addFav(profileId: number, storyId: number): Promise<void> {
    const favAdded = await prisma.profile.update({
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
    console.log('Added story to favourites list:', favAdded);
}
  
   








async function main() {
  const user = await createUser({
      email: 'example@email.com',
      password: 'password',
      profiles: {
        create: {
          name: 'jane',
          picture: 'imglink',
          readLev: 5,
        },
      },
  });

  console.log('Created new user with profile:', user);


  const story = await createStory({
    theme: ['adventure', 'fantasy'],
    mainCharacter: 'Hero',
    storyString: 'Once upon a time...',
    prompt: 'Write an adventurous story',
    model: 'GPT-4',
    rating: 5,
    plots: 'Hero saves the day',
    readingTime: 10,
    profiles: {
      connect: { id: user.profiles[0].id }, // Assuming the profile ID exists
    },
  });

  console.log('Created new story and linked to profile:', story);
}


main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    })


    async function getUserProfilesAndStories(userId: number): Promise<void> {
        const user = await prisma.user.findUnique({
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
      
        console.log('User with profiles and stories:', JSON.stringify(user, null, 2));
      }
      
      getUserProfilesAndStories(1) // Assuming user ID 1 exists
        .catch((e) => {
          console.error(e);
          process.exit(1);
        })
        .finally(async () => {
          await prisma.$disconnect();
        });



       