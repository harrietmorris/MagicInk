"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield prisma.user.create({
            data: {
                email: 'example@email.com',
                password: 'password',
                profiles: {
                    create: {
                        name: 'jane',
                        picture: 'imglink',
                        readLev: 5,
                    },
                },
            },
        });
        console.log('Created new user with profile:', user);
    });
}
main()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}))
    .catch((e) => __awaiter(void 0, void 0, void 0, function* () {
    console.error(e);
    yield prisma.$disconnect();
    process.exit(1);
}));
function createStory() {
    return __awaiter(this, void 0, void 0, function* () {
        const story = yield prisma.story.create({
            data: {
                theme: ['adventure', 'fantasy'],
                mainCharacter: 'Hero',
                storyString: 'Once upon a time...',
                prompt: 'Write an adventurous story',
                model: 'GPT-4',
                rating: 5,
                plots: 'Hero saves the day',
                readingTime: 10,
                profiles: {
                    connect: { id: 1 },
                },
            },
        });
        console.log('Created new story and linked to profile:', story);
    });
}
createStory()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
function getUserProfilesAndStories(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield prisma.user.findUnique({
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
    });
}
getUserProfilesAndStories(1) // Assuming user ID 1 exists
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
function addStoryToFavorites(profileId, storyId) {
    return __awaiter(this, void 0, void 0, function* () {
        const updatedProfile = yield prisma.profile.update({
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
        console.log('Updated profile with favorite stories:', updatedProfile);
    });
}
addStoryToFavorites(1, 1) // Assuming profile ID 1 and story ID 1 exist
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
