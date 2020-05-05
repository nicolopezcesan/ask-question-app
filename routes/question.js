
'use strict'

import { Router } from 'express';
import QuestionController from './../controllers/question';

const api = Router();

api.post('/question-test', QuestionController.test);
api.post('/question', QuestionController.saveQuestion);

export default api;