import express from 'express';

import createTest from './createTest.js';
import getAllTests from './getAllTests.js';
import getTestById from './getTestById.js';
import updateTest from './updateTest.js';
import deleteTest from './deleteTest.js';
import getTestByCourseId from './getTestByCourseId.js';

import submitTest from './submitTest.js';
import getAllSubmittedTests from './getAllSubmittedTests.js';
import getSubmittedTestByUserIdAndTestID from './getSubmittedTestByUserIdAndTestID.js';
import getSubmittedTestById from './getSubmittedTestById.js';
import getSubmittedTestByUserId from './getSubmittedTestByUserId.js';
import updateSubmittedTestById from './updateSubmittedTestById.js';
import deleteSubmittedTestById from './deleteSubmittedTestById.js';

const TestRouter = express.Router();

TestRouter.post('/', createTest);
TestRouter.get('/', getAllTests);
TestRouter.get('/:id', getTestById);
TestRouter.put('/:id', updateTest);
TestRouter.delete('/:id', deleteTest);
TestRouter.get('/course/:id', getTestByCourseId);

TestRouter.post('/submit', submitTest);
TestRouter.get('/submit', getAllSubmittedTests);
TestRouter.get('/submit/:user_id/:test_id', getSubmittedTestByUserIdAndTestID);
TestRouter.get('/submit/:id', getSubmittedTestById);
TestRouter.put('/submit/:id', updateSubmittedTestById);
TestRouter.get('/submit/user/:id', getSubmittedTestByUserId);
TestRouter.delete('/submit/:id', deleteSubmittedTestById);

export default TestRouter;
