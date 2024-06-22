import Router from '@koa/router';
import * as controller from './controllers/user'
const router = new Router();

// router.get('/', (ctx) => {
//     ctx.body = 'Hello world!';
//   });

router.post('/user', controller.createUser);
router.get('/user/:id', controller.getUserProfilesAndStories);
router.post('/favs', controller.addStoryToFavorites);

export default router;