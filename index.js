'use strict';

import mongoose from 'mongoose';
import app from './app';
var port = 5000;

// Conexión Database
let url = 'mongodb://localhost:27017/ask_question_app';
mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
        console.log('Connect successfull! :)');

        // Crear servidor
        app.listen(port, () => {
            console.log('Server run on http://localhost:5000');
        });
    })
    .catch(err => console.log(err));