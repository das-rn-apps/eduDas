import { Router } from 'express';

import createPracticePaper from './createPracticePaper.js';
import getAllPracticePapers from './getAllPracticePapers.js';
import updatePracticePaper from './updatePracticePaper.js';
import getPracticePaperById from './getPracticePaperById.js';
import deletePracticePaper from './deletePracticePaper.js';

const PracticePaperRouter = Router();

PracticePaperRouter.post('/', createPracticePaper);
PracticePaperRouter.get('/', getAllPracticePapers);
PracticePaperRouter.put('/:id', updatePracticePaper);
PracticePaperRouter.get('/:id', getPracticePaperById);
PracticePaperRouter.delete('/:id', deletePracticePaper);

export default PracticePaperRouter;
