import Router from '@koa/router';
import postNewStory from './controllers/gemini';
import { addToFavs, createProfile, getProfile, updateProfile, deleteProfile, getFavStories, getStoriesList, removeFromFavs } from './controllers/profile';
import { getStoryById } from './controllers/story';
import { createUser, getUserInfo, getUserProfiles, loginUser } from './controllers/user';

const router = new Router();

//gemini
router.post('/profiles/:profId/story', postNewStory);

//prisma
router.post('/user', createUser)
router.post('/users/login', loginUser); //checks that login is correct, we may not need this though with oAuth?
router.get('/users/:userId', getUserInfo);
router.get('/users/:userId/profiles', getUserProfiles);

router.post('/users/:userId/profiles', createProfile);
router.get('/profiles/:profileId', getProfile);
router.delete('/profiles/:profileId', deleteProfile);
router.patch('/profiles/:profileId', updateProfile);

router.put('/profiles/:profileId/favs/:storyId', addToFavs);
router.delete('/profiles/:profileId/favs/:storyId', removeFromFavs);

router.get('/stories/:storyId', getStoryById);
router.get('/profiles/:profileId/storiesList', getStoriesList);
router.get('/profiles/:profileId/favs', getFavStories);

export default router;