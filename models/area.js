'use strict'

import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const AreaSchema = Schema({
    name: String
});


export default model('Area', AreaSchema);