import { Router } from 'express';

import createDoubt from './createDoubt.js';
import addChat from './addChat.js';
import getAllDoubts from './getAllDoubts.js';
import getDoubtById from './getDoubtById.js';
import deleteDoubt from './deleteDoubt.js';
import deleteChat from './deleteChat.js';
import updateChat from './updateChat.js';


const DoubtRouter = Router();

DoubtRouter.post('/', createDoubt);
DoubtRouter.post('/:doubtId/chats', addChat);
DoubtRouter.get('/', getAllDoubts);
DoubtRouter.get('/:doubtId', getDoubtById);
DoubtRouter.delete('/:doubtId', deleteDoubt);
DoubtRouter.delete('/:doubtId/chats/:chatId', deleteChat);
DoubtRouter.put('/:doubtId/chats/:chatId', updateChat);

export default DoubtRouter;