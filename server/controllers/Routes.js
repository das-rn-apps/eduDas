import { Router } from 'express';

import CourseContentRouter from './courseContent/index.js';
import CourseRouter from './courses/index.js';
import PracticePaperRouter from './practicePaper/index.js';
import StudentRouter from './students/index.js';
import TestRouter from './tests/index.js';
import VideoRouter from './videos/index.js';
import DoubtRouter from './doubts/index.js';
import QuestionRouter from './question/index.js';
import PlaylistRouter from './playlist/index.js';

const ApiRouter = Router();

// Define routes
ApiRouter.use("/courseContent", CourseContentRouter);
ApiRouter.use("/courses", CourseRouter);
ApiRouter.use("/practice-papers", PracticePaperRouter);
ApiRouter.use("/user", StudentRouter);
ApiRouter.use("/tests", TestRouter);
ApiRouter.use("/tests/addQuestion", QuestionRouter);
ApiRouter.use("/videos", VideoRouter);
ApiRouter.use("/doubts", DoubtRouter);
ApiRouter.use("/playlist", PlaylistRouter);

export default ApiRouter;
