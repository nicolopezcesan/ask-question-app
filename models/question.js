'use strict'

import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const QuestionSchema = Schema({
    title: String,
    description: String,
    // area: { type: Schema.ObjectId, ref: 'Area' },
    hashtag: [{ type: Schema.ObjectId, ref: 'Hashtag' }],
    created_at: String,
    created_by: { type: Schema.ObjectId, ref: 'User' }
});


export default model('Question', QuestionSchema);