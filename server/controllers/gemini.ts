import {createPrompt, createContinuationPrompt, promptForMore } from '../prompt';
import model from '../gemini';
import { StoryRequestBody, CreateStoryRequestBody } from '../serverTypes';
import * as Koa from "koa"
import prisma from '../models';

export async function postNewStory(ctx: Koa.Context) {
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
        location,
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

export async function continueStory(ctx: Koa.Context) {
  const { storyId, optionSelected } = ctx.params;
  try {
    const originalSory = await prisma.story.findUnique({
      where: {
        id: parseInt(storyId, 10),
      },
    });
    if (!originalSory) {
      ctx.status = 404;
      ctx.body = 'Story not found';
      return;
    }
    if (originalSory.currentBreakpoint === originalSory.breakpoints) {
      ctx.status = 400;
      ctx.body = 'Story already complete';
      return;
    }
    const prompt = createContinuationPrompt(
      originalSory.storyString,
      originalSory.currentBreakpoint + 1,
      originalSory.breakpoints,
      parseInt(optionSelected, 10),
      originalSory.themes,
      originalSory.readingLevel,
      originalSory.location,
      originalSory.readingTime
    );

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    if (text.includes('ERROR: could not write the story')) {
      ctx.status = 204;
      return;
    }

    const story = originalSory.storyString + '\n' + text;
    const updatedStory = await prisma.story.update({
      where: {
        id: parseInt(storyId, 10),
      },
      data: {
        storyString: story,
        currentBreakpoint: originalSory.currentBreakpoint + 1,
      },
    });

    ctx.status = 201;
    ctx.body = updatedStory

  } catch (e) {
    console.error(e);
    ctx.status = 500;
    ctx.body = 'Error generating story';  
  }
}

export async function addMoreStory(ctx: Koa.Context) {
  const profileId = parseInt(ctx.params.profileId);
  const storyId = parseInt(ctx.params.storyId);
  const { title, storyString, prompt, readingTime, readingLevel, themes } = ctx.request.body as CreateStoryRequestBody

  const oldStory = ctx.request.body
  console.log(oldStory)
  if (!ctx.request.body) {
    ctx.status = 400;
    ctx.body = 'Bad request';
    return;
  }
  try {
    const newChapter = promptForMore (title, storyString, prompt, readingTime, readingLevel, themes )
    const result = await model.generateContent(newChapter);
    const response = await result.response;
    const text = response.text();
    const rx = new RegExp("##[\\d\\D]*?\n\n", "g");
    const storyText = text.replace(rx, '');
    const updatedStory = await prisma.story.update({
      where: { id: storyId },
      data: { storyString: storyText }
    })
    ctx.body = updatedStory
  } catch (e) {
    console.error(e);
    ctx.status = 500;
    ctx.body = 'Error updating story';
  }
}

