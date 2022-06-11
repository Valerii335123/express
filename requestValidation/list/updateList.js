const {body} = require('express-validator');

exports.updateList = [
    body('title')
        .exists()
        .withMessage('Field is required')
        .isLength({min: 5, max: 255})
        .withMessage('Length must be from 5 to 255 symbol'),

    body('description')
        .exists()
        .withMessage('Field is required')
        .isLength({min: 10})
        .withMessage('Min length is 5 symbol'),

];