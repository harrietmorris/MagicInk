import { Context } from 'koa';
import prisma from '../models';
import { CreateStoryRequestBody } from '../types';

export async function createStory(ctx: Context) {
    const { profileId } = ctx.params;
    const body = ctx.request.body as CreateStoryRequestBody;
    const { theme, mainCharacter, storyString, prompt, model, rating, plots, readingTime } = body;

    try {
        const story = await prisma.story.create({
            data: {
                theme,
                mainCharacter,
                storyString,
                prompt,
                model,
                rating,
                plots,
                readingTime,
                profiles: {
                    connect: {
                        id: parseInt(profileId, 10),
                    },
                },
            },
        });

        ctx.body = story;
    } catch (error) {
        ctx.status = 400;
        ctx.body = { error: 'Error creating story' };
    }
}

export async function recallStory(ctx: Context) {
    const { storyId } = ctx.params;

    try {
        const story = await prisma.story.findUnique({
            where: { id: parseInt(storyId, 10) },
            include: {
                profiles: true,
                favs: true,
            },
        });

        if (!story) {
            ctx.status = 404;
            ctx.body = { error: 'Story not found' };
            return;
        }

        ctx.body = story;
    } catch (error) {
        ctx.status = 400;
        ctx.body = { error: 'Error fetching story' };
    }
}