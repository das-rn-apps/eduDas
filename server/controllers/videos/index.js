import express from 'express';

import createVideoList from './createVideoList.js';
import getAllVideoLists from './getAllVideoLists.js';
import updateVideoList from './updateVideoList.js';
import getVideoListById from './getVideoListById.js';
import deleteVideoList from './deleteVideoList.js';

const VideoRouter = express.Router();

VideoRouter.post('/', createVideoList);
VideoRouter.get('/', getAllVideoLists);
VideoRouter.put('/:id', updateVideoList);
VideoRouter.get('/:id', getVideoListById);
VideoRouter.delete('/:id', deleteVideoList);

export default VideoRouter;
