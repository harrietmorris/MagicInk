import { Context } from 'koa';
import prisma from '../models';
import { CreateProfileRequestBody, updatedProfileRequestBody } from '../serverTypes';

export async function createProfile(ctx: Context) {
    const { userId } = ctx.params;
    const body = ctx.request.body as CreateProfileRequestBody;
    const { name, picture, readingLevel } = body;
    try {
        const profile = await prisma.profile.create({
          data: {
            userId: parseInt(userId, 10),
            name,
            picture,
            readingLevel,
            storiesList: { create: [] },
            favs: { connect: [] },
          },
        });
        ctx.status = 201;
        ctx.body = profile;
    } catch (error) {
        console.error('Error creating profile', error);
        ctx.status = 400;
        ctx.body = { error: 'Error creating profile' };
    }
}

export async function getProfile(ctx: Context) {
    const { profileId } = ctx.params;
    try {
        const profile = await prisma.profile.findUnique({
            where: { id: parseInt(profileId, 10) },
            include: {
                favs: true,
                storiesList: true,
            },
        });
        if (!profile) {
            ctx.status = 404;
            ctx.body = { error: 'Profile not found' };
            return;
        }
        ctx.body = profile;
    } catch (error) {
        console.error('Error fetching profile', error);
        ctx.status = 400;
        ctx.body = { error: 'Error fetching profile' };
    }
}

export async function updateProfile(ctx: Context) {
    const { profileId } = ctx.params;
    const body = ctx.request.body as updatedProfileRequestBody
    try {
        const profile = await prisma.profile.update({
            where: { id: parseInt(profileId, 10) },
            data: body,
        });
        ctx.body = profile;
    } catch (error) {
        console.error('Error updating profile', error);
        ctx.status = 400;
        ctx.body = { error: 'Error updating profile' };
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
        ctx.status = 200;
        ctx.body = updatedProfile;
    } catch (error) {
        console.error('Error adding story to favs', error);
        ctx.status = 400;
        ctx.body = { error: 'Error adding story to favs' };
    }
}


export async function deleteProfile(ctx: Context) {
    const { profileId } = ctx.params;

    try {
        const profile = await prisma.profile.delete({
            where: { id: parseInt(profileId, 10) },
        });
        ctx.status = 204;
        ctx.body = { message: 'Profile deleted successfully', profile };
    } catch (error) {
        console.error('Error deleting profile', error);
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
        ctx.status = 200;
        ctx.body = updatedProfile;

    } catch (error) {
        console.error('Error removing story from favs', error);
        ctx.status = 400;
        ctx.body = { error: 'Error removing story from favs' };
    }
}