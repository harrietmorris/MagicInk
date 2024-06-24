import Router from '@koa/router';
import postNewStory from './controllers/gemini';
import { addToFavs, createProfile, deleteProfile, getFavStories, getStoriesList, removeFromFavs } from './controllers/profile';
import { createStory, getStoryById } from './controllers/story';
import { createUser, getUserInfo, getUserProfiles, loginUser } from './controllers/user';

const router = new Router();

//gemini
router.post('/story', postNewStory);

//prisma
router.post('/user', createUser)
router.post('/users/login', loginUser); //checks that login is correct, we may not need this though with oAuth?
router.get('/users/:userId', getUserInfo);
router.get('/users/:userId/profiles', getUserProfiles);

router.post('/users/:userId/profiles', createProfile);
router.post('/profiles/:profileId/stories', createStory);
router.put('/profiles/:profileId/favs/:storyId', addToFavs);
router.delete('/profiles/:profileId/favs/:storyId', removeFromFavs);

router.get('/stories/:storyId', getStoryById);
router.get('/profiles/:profileId/storiesList', getStoriesList);
router.get('/profiles/:profileId/favs', getFavStories);

router.delete('/profiles/:profileId', deleteProfile);


export default router;