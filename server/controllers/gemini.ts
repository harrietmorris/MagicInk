import createPrompt from '../prompt';
import model from '../gemini';
import { StoryRequestBody } from '../types';
import * as Koa from "koa"

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
    // TODO: save the story to the database
    ctx.status = 200;
    // TODO: return the story id & title
    ctx.body = text;

  } catch (e) {
    console.error(e);
    ctx.status = 500;
    ctx.body = 'Internal server error';
  }
}
