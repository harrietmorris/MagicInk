import Router from '@koa/router';
import createPrompt from './prompt';
import model from './gemini';

const router = new Router();

router.get('/', (ctx) => {
    ctx.body = 'Hello world!';
  });

router.post('/story', async (ctx) => {
  const { age, location, readingTime, themes, simpleLanguage, words } = ctx.body as {
    age: string;
    location: string;
    readingTime: string;
    themes: string[];
    simpleLanguage: boolean;
    words: number[];
  };
  try {
    const prompt = createPrompt(age, location, readingTime, themes, simpleLanguage, words);
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    ctx.body = text;
  } catch (e) {
    console.error(e);
    ctx.status = 500;
    ctx.body = 'Internal server error';
  }
});


export default router;