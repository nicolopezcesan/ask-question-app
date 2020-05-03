'use strict'

import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const UserSchema = Schema({
    name: String,
    surname: String,
    nick: String,
    email: String,
    password: String,
    role: String,
    image: String
});


export default model('User', UserSchema);