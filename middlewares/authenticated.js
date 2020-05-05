'use strict'

import { decode } from 'jwt-simple';
import moment from 'moment';

const secret = 'secret_key_ask_question_app';

const ensureAuth = (req, res, next) => {
    
    if (!req.headers.authorization) return res.status(403).send({ message: 'The request does not have the authentication header' });

    const token = req.headers.authorization.replace(/['"]+/g, '');

    try {
        var payload = decode(token, secret);
        
        if (payload.exp <= moment().unix()) {
            return res.status(401).send({ message: 'The token has expired' });
        }
    } catch (ex) {
        return res.status(404).send({ message: 'The token is not valid' });
    }

    req.user = payload;

    next();
}

export default ensureAuth;