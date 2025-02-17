import { Router } from 'express';
import { getSubjects } from '../controllers/subjectController';

const router = Router();

router.get('/subjects', getSubjects);

export default router;