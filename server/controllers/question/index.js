import express from 'express';

import addQuestion from './addQuestion.js';


const QuestionRouter = express.Router();

QuestionRouter.put('/:id', addQuestion);

export default QuestionRouter;
