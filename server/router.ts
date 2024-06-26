import Router from '@koa/router';
import postNewStory from './controllers/gemini';
import { addToFavs, createProfile, getProfile, updateProfile, deleteProfile, getFavStories, getStoriesList, removeFromFavs } from './controllers/profile';
import { createStory, getStoryById } from './controllers/story';
import { getUserProfiles, loginUser } from './controllers/user';

const router = new Router();

//gemini
router.post('/story', postNewStory);

//prisma
router.post('/users/login', loginUser);
router.get('/users/:userId/profiles', getUserProfiles);

router.post('/users/:userId/profiles', createProfile);
router.get('/profiles/:profileId', getProfile);
router.delete('/profiles/:profileId', deleteProfile);
router.patch('/profiles/:profileId', updateProfile);

router.post('/profiles/:profileId/stories', createStory);
router.put('/profiles/:profileId/favs/:storyId', addToFavs);
router.delete('/profiles/:profileId/favs/:storyId', removeFromFavs);

router.get('/stories/:storyId', getStoryById);
router.get('/profiles/:profileId/storiesList', getStoriesList);
router.get('/profiles/:profileId/favs', getFavStories);

export default router;