'use strict'

import { encode } from 'jwt-simple';
import moment from 'moment';
const secret = 'secret_key_ask_question_app';

export function createToken(user) {
    const payload = {
        sub: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        role: user.role,
        image: user.image,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix(),
        test: user,
        test2: user._id
    };

    return encode(payload, secret);
}