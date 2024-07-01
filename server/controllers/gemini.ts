import createPrompt from '../prompt';
import model from '../gemini';
import { StoryRequestBody } from '../serverTypes';
import * as Koa from "koa"
import prisma from '../models';

export default async function postNewStory(ctx: Koa.Context) {
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
    !('chooseYourStory' in ctx.request.body) ||
    !('breakpoints' in ctx.request.body)
  ) {
    ctx.status = 400;
    ctx.body = 'Bad request';
    return;
  }

  const { readingLevel, location, readingTime, themes, chooseYourStory, breakpoints} = ctx.request.body as StoryRequestBody
  try {
    const prompt = createPrompt(readingLevel, location, readingTime, themes, chooseYourStory, breakpoints);
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    if (text.includes('ERROR: could not write the story')) {
      ctx.status = 204;
      return;
    }

    const title = text.split('\n')[0].replace('##', '').trim();
    const rx = new RegExp("##[\\d\\D]*?\n\n", "g");
    const storyText = text.replace(rx, '');
    const { profId } = ctx.params;
    const story = await prisma.story.create({
      data: {
        title,
        storyString: storyText,
        prompt,
        model: 'gemini-1.5-flash',
        readingTime,
        readingLevel,
        themes,
        chooseYourStory,
        currentBreakpoint: 0,
        breakpoints,
        profiles: {
          connect: {
            id: parseInt(profId, 10),
          },
        },
      },
    });
    ctx.status = 201;
    ctx.body = story;
  } catch (e) {
    console.error(e);
    ctx.status = 500;
    ctx.body = 'Error generating story';
  }
}
