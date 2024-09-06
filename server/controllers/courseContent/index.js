import { Router } from 'express';

import createCourseContent from './createCourseContent.js';
import getCourseContents from './getCourseContents.js';
import getCourseContentById from './getCourseContentById.js';
import updateCourseContent from './updateCourseContent.js';
import deleteCourseContent from './deleteCourseContent.js';

const CourseContentRouter = Router();

CourseContentRouter.post('/', createCourseContent);
CourseContentRouter.get('/', getCourseContents);
CourseContentRouter.get('/:id', getCourseContentById);
CourseContentRouter.put('/:id', updateCourseContent);
CourseContentRouter.delete('/:id', deleteCourseContent);

export default CourseContentRouter;
