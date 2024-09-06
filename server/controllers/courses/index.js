import { Router } from 'express';

import getCourse from './getCourse.js';
import addCourse from './addCourse.js';
import getCourseById from './getCourseById.js';
import updateCourseByID from './updateCourseByID.js';
import deleteCourse from './deleteCourse.js';
import addCourseByUserId from './addCourseByUserId.js';
import getCourseByUserId from './getCourseByUserId.js';
import updateCourseByUserId from './updateCourseByUserId.js';
import getOtherCourseByUserId from './getOtherCourseByUserId.js';


const CourseRouter = Router();

CourseRouter.post('/', addCourse);
CourseRouter.get('/', getCourse);
CourseRouter.get('/:id', getCourseById);
CourseRouter.put('/:id', updateCourseByID);
CourseRouter.delete('/:id', deleteCourse);
CourseRouter.post('/add/:user_id/:course_id', addCourseByUserId);
CourseRouter.get('/user/:id', getCourseByUserId);
CourseRouter.put('/user/:id', updateCourseByUserId);
CourseRouter.get('/exceptuser/:id', getOtherCourseByUserId);

export default CourseRouter;
