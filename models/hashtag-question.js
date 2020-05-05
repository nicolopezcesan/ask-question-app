'use strict'

import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const HashtagQuestionSchema = Schema({
    id_question: { type: Schema.ObjectId, ref: 'Hashtag' }
});


export default model('Hashtag', HashtagQuestionSchema);