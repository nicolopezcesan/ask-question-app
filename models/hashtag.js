'use strict'

import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const HashtagSchema = Schema({
    name: String
});


export default model('Hashtag', HashtagSchema);