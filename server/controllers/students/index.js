import express from 'express';

import createStudent from './createStudent.js';
import loginStudent from './loginStudent.js';
import getStudents from './getStudents.js';
import getStudentById from './getStudentById.js';
import updateStudent from './updateStudent.js';
import deleteStudent from './deleteStudent.js';

const StudentRouter = express.Router();

StudentRouter.post('/', createStudent);
StudentRouter.post('/login', loginStudent);
StudentRouter.get('/', getStudents);
StudentRouter.get('/:id', getStudentById);
StudentRouter.put('/:id', updateStudent);
StudentRouter.delete('/:id', deleteStudent);

export default StudentRouter;
