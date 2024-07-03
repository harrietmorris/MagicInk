import { Context } from 'koa';
import prisma from '../models';
import { LoginRequestBody } from '../serverTypes';

export async function loginUser(ctx: Context) {
  const { id, email, givenName, familyName, name } = ctx.request.body as LoginRequestBody;

  try {
    const user = await prisma.user.upsert({
      where: { id: id },
      update: {},
      create: {
        id,
        email,
        givenName,
        familyName,
        name,
      },
      include: {
        profiles: true,
      },
    });
    ctx.status = 201;
    ctx.body = { id, email, givenName, familyName, name };
  } catch (error) {
    ctx.status = 400;
    ctx.body = { error: error };
  }
}

export async function getUserInfo(ctx: Context) {
  const { userId } = ctx.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        givenName: true,
        familyName: true,
        name: true,
      },
    });

    if (!user) {
      ctx.status = 404;
      ctx.body = { error: 'User not found' };
      return;
    }
    ctx.status = 200;
    ctx.body = user;
  } catch (error) {
    ctx.status = 400;
    ctx.body = { error: 'Error fetching user information' };
  }
}

export async function getUserProfiles(ctx: Context) {
  const { userId } = ctx.params;

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
    ctx.status = 200;
    ctx.body = user.profiles;
  } catch (error) {
    ctx.status = 400;
    ctx.body = { error: 'Error fetching user profiles' };
  }
}
