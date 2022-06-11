const {body} = require('express-validator');

exports.login = [
    body('email')
        .exists()
        .withMessage('Email is required'),

    body('password')
        .exists()
        .withMessage('Password is required'),
];