import { Context } from 'koa';
import prisma from '../models';
import { CreateUserRequestBody, LoginRequestBody } from '../serverTypes';

export async function createUser(ctx: Context) {
    const body = ctx.request.body as CreateUserRequestBody;
    const { email, password } = body;
    try {
        const user = await prisma.user.create({
            data: {
                email,
                password,
            },
        });
        ctx.body = user;
    } catch (error) {
        ctx.status = 400;
        ctx.body = { error: 'Error creating user' };
    }
}

export async function loginUser(ctx: Context) {
    const { email, password } = ctx.request.body as LoginRequestBody;

    try {
        const user = await prisma.user.findUnique({
            where: { email },
            include: {
                profiles: true,
            },
        });

        if (!user || user.password !== password) {
            ctx.status = 401;
            ctx.body = { error: 'Invalid credentials' };
            return;
        }
        ctx.status = 201;
        ctx.body = user;
    } catch (error) {
        ctx.status = 400;
        ctx.body = { error: 'Error logging in user' };
    }
}

export async function getUserInfo(ctx: Context) {
    const { userId } = ctx.state.user;

    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
            },
        });

        if (!user) {
            ctx.status = 404;
            ctx.body = { error: 'User not found' };
            return;
        }

        ctx.body = user;
    } catch (error) {
        ctx.status = 400;
        ctx.body = { error: 'Error fetching user information' };
    }
}

export async function getUserProfiles(ctx: Context) {
    const userId = parseInt(ctx.params.userId);

    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                profiles: true,
            },
        });

        if (!user) {
            ctx.status = 404;
            ctx.body = { error: 'User not found' };
            return;
        }

        ctx.body = user.profiles;
    } catch (error) {
        ctx.status = 400;
        ctx.body = { error: 'Error fetching user profiles' };
    }
}