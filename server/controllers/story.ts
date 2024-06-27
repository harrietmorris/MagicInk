import { Context } from 'koa';
import prisma from '../models';

export async function getStoryById(ctx: Context) {
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
    console.log(error);
    ctx.status = 400;
    ctx.body = { error: 'Error fetching story' };
  }
}
