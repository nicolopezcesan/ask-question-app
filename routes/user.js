
'use strict'

import { Router } from 'express';
import UserController from './../controllers/user';
import ensureAuth from './../middlewares/authenticated';

const api = Router();
// import multipart from 'connect-multiparty';
// const md_upload = multipart({ uploadDir: './uploads/users' });

api.post('/pruebas', UserController.pruebas);
api.post('/register', UserController.registerUser);
api.post('/login', UserController.loginUser);
api.put('/update-user/:id', ensureAuth, UserController.updateUser);

export default api;