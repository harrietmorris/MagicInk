import { Context } from 'koa';
import * as userModel from '../models/user';


export async function createUser(ctx: Context): Promise<void> {
  try {
    const userData: userModel.User = ctx.request.body;
    const user = await userModel.createUser(userData);
    ctx.status = 201;
    ctx.body = user;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Internal Server Error' };
  }
}

export async function getUserProfilesAndStories(ctx: Context): Promise<void> {
  try {
    const userId: number = parseInt(ctx.params.id, 10);
    const user = await userModel.getUserProfilesAndStories(userId);
    if (user) {
      ctx.body = user;
    } else {
      ctx.status = 404;
      ctx.body = { error: 'User not found' };
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Internal Server Error' };
  }
}

export async function addStoryToFavorites(ctx: Context): Promise<void> {
  try {
    const { profileId, storyId } = ctx.request.body;
    const updatedProfile = await userModel.addStoryToFavorites(profileId, storyId);
    ctx.body = updatedProfile;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Internal Server Error' };
  }
}

export async function disconnect(ctx: Context): Promise<void> {
  try {
    await userModel.disconnect();
    ctx.status = 200;
    ctx.body = { message: 'Disconnected from database' };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Internal Server Error' };
  }
}