'use strict'

import User from './../models/user';
import Question from '../models/question';
import Hashtag from './../models/hashtag';
// import HashtagQuestion from './../models/hashtag-question';


import moment from 'moment';
import { response } from 'express';
// import { hash } from 'bcrypt-nodejs';

// import { hash as _hash, compare } from 'bcrypt-nodejs';
// import { createToken } from './../services/jwt';


const test = (req, res) => {
    const params = req.body;

    return res.status(200).send({
        message: 'Todo ok! :)'
    });
}

const saveQuestion = async (req, res) => {
    const params = req.body;

    if (!params.title) return res.status(200).send({ message: 'No text was entered' });

    const question = new Question();

    question.title = params.title;
    question.description = params.description;
    // question.area = params.area;
    question.created_at = moment().unix();
    question.create_by = '5eaf91acde815fbe7833fe07'; // req.user.sub;

    let hashtagsSaved;
    const hashtag = hasHashtags(params.description);
    
    if (hashtag.hasHashtag) {
        hashtagsSaved = await forEachSaveHashtag(hashtag.hashtags, res);

        // Para evitar esto, podría devolver dos listas y listo.
        const newArr = hashtagsSaved.map((elem) => {
            return elem._id;
        });

        question.hashtag = newArr;
    }

    question.save((err, questionStored) => {
        if (err) return res.status(500).send({ message: 'Error saving question' });

        if (!questionStored) return res.status(404).send({ message: 'The question question has not been saved' });

        questionStored.hashtag = hashtagsSaved;

        return res.status(200).send({
            question: questionStored,
        });
    });
}

const hasHashtags = (searchText) => {
    // var searchText = "Hola este es mi texto que habla de #animales brindo por #ellos";
    const regexp = /\B\#\w\w+\b/g
    let hashtags = searchText.match(regexp);

    return {
        hasHashtag: (hashtags && hashtags.length > 0),
        hashtags
    }
}

const forEachSaveHashtag = async (array, res) => {

    const list = array;
    let newArray = [];

    for (const elem of list) {
        let newElem = await saveHashtag(elem, res);
        newArray.push(newElem);
    }

    return newArray;
}

const saveHashtag = (elem, res) => {
    return new Promise((resolve) => {

        let hashtag = new Hashtag();
        hashtag.name = elem;

        hashtag.save((err, hashtagStored) => {
            if (err) return res.status(500).send({ message: 'Error saving hashtag question' });

            if (!hashtagStored) return res.status(404).send({ message: 'The question question has not been saved' });

            // console.log({ id_: hashtagStored._id });
            return resolve(hashtagStored);
        });
    });
}

// TODO
const updateQuestion = (req, res) => {
    const userId = req.params.id;
    let update = req.body;

    delete update.password;

    if (userId != req.user.sub) {
        return res.status(500).send({ message: 'You do not have permission to update user data' });
    }

    User.find({
        $or: [
            { email: update.email.toLowerCase() },
            { nick: update.nick.toLowerCase() }
        ]
    }).exec((err, users) => {
        let user_isset = false;
        users.forEach((user) => {
            if (user && user._id != userId) user_isset = true;
        });

        if (user_isset) return res.status(404).send({ message: 'The entered data is already in use' });

        User.findByIdAndUpdate(userId, update, { new: true }, (err, user) => {
            if (err) return res.status(500).send({ message: 'Failed request' });

            if (!user) return res.status(404).send({ message: 'Could not update user' });

            return res.status(200).send({ user: user });
        });
    });
}






export default {
    test,
    saveQuestion,
    updateQuestion
}
