import createPrompt from '../prompt';
import model from '../gemini';
import { StoryRequestBody } from '../types';
import * as Koa from "koa"
import prisma from '../models';

export default async function getStory(ctx: Koa.Context) {
  if (!ctx.request.body) {
    ctx.status = 400;
    ctx.body = 'Bad request';
    return;
  }

  if ( !(typeof ctx.request.body === 'object') ||
    !('readingLevel' in ctx.request.body) ||
    !('location' in ctx.request.body) ||
    !('readingTime' in ctx.request.body) ||
    !('themes' in ctx.request.body) ||
    !('simpleLanguage' in ctx.request.body) ||
    !('words' in ctx.request.body)
  ) {
    ctx.status = 400;
    ctx.body = 'Bad request';
    return;
  }

  const { readingLevel, location, readingTime, themes, simpleLanguage, words } = ctx.request.body as StoryRequestBody
  try {
    const prompt = createPrompt(readingLevel, location, readingTime, themes, simpleLanguage, words);
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const title = text.split('\n')[0].replace('##', '').trim();

    const story = await prisma.story.create({
      data: {
        title,
        storyString: text,
        prompt,
        model: 'gemini-1.5-flash',
        readingTime,
        themes,
        // TODO: connect to profile
        // profiles: {
        //   connect: {
        //     id: parseInt(profileId, 10),
        //   },
        // },
      }
    });
    ctx.status = 200;
    ctx.body = { id: story.id, title};
  } catch (e) {
    console.error(e);
    ctx.status = 500;
    ctx.body = 'Error generating story';
  }
}
