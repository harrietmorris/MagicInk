import { Context } from 'koa';
import prisma from '../models';
import { CreateProfileRequestBody } from '../serverTypes';

export async function createProfile(ctx: Context) {
    const { userId } = ctx.params;
    const body = ctx.request.body as CreateProfileRequestBody;
    const { name, picture, readLev } = body;
    try {
        const profile = await prisma.profile.create({
            data: {
                userId: parseInt(userId, 10),
                name,
                picture,
                readLev,
                storiesList: { create: [] },
                favs: { connect: [] },
            },
        });
        ctx.body = profile;
    } catch (error) {
        ctx.status = 400;
        ctx.body = { error: 'Error creating profile' };
    }
}

export async function addToFavs(ctx: Context) {
    const { profileId, storyId } = ctx.params;

    try {
        const updatedProfile = await prisma.profile.update({
            where: { id: parseInt(profileId, 10) },
            data: {
                favs: {
                    connect: { id: parseInt(storyId, 10) },
                },
            },
            include: {
                favs: true, 
            },
        });

        ctx.body = updatedProfile;
    } catch (error) {
        ctx.status = 400;
        ctx.body = { error: 'Error adding story to favs' };
    }
}

export async function getStoriesList(ctx: Context) {
    const { profileId } = ctx.params;

    try {
        const profile = await prisma.profile.findUnique({
            where: { id: parseInt(profileId, 10) },
            include: {
                storiesList: true,
            },
        });

        if (!profile) {
            ctx.status = 404;
            ctx.body = { error: 'Profile not found' };
            return;
        }

        ctx.body = profile.storiesList;
    } catch (error) {
        ctx.status = 400;
        ctx.body = { error: 'Error fetching stories list' };
    }
}


export async function getFavStories(ctx: Context) {
    const { profileId } = ctx.params;

    try {
        const profile = await prisma.profile.findUnique({
            where: { id: parseInt(profileId, 10) },
            include: {
                favs: true,
            },
        });

        if (!profile) {
            ctx.status = 404;
            ctx.body = { error: 'Profile not found' };
            return;
        }

        ctx.body = profile.favs;
    } catch (error) {
        ctx.status = 400;
        ctx.body = { error: 'Error fetching favorite stories' };
    }
}

export async function deleteProfile(ctx: Context) {
    const { profileId } = ctx.params;

    try {
        const profile = await prisma.profile.delete({
            where: { id: parseInt(profileId, 10) },
        });

        ctx.body = { message: 'Profile deleted successfully', profile };
    } catch (error) {
        ctx.status = 400;
        ctx.body = { error: 'Error deleting profile' };
    }
}


export async function removeFromFavs(ctx: Context) {
    const { profileId, storyId } = ctx.params;

    try {
        const updatedProfile = await prisma.profile.update({
            where: { id: parseInt(profileId, 10) },
            data: {
                favs: {
                    disconnect: { id: parseInt(storyId, 10) },
                },
            },
            include: {
                favs: true, 
            },
        });

        ctx.body = updatedProfile;
    } catch (error) {
        ctx.status = 400;
        ctx.body = { error: 'Error removing story from favs' };
    }
}