import Router from '@koa/router';
import getStory from './controllers/gemini';

const router = new Router();

router.get('/', (ctx) => {
    ctx.body = 'Hello world!';
  });

router.post('/story', getStory);


export default router;