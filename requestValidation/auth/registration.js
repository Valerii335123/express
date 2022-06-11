const User = require('../../models/user');
const {body} = require('express-validator');

exports.registration = [
    body('name')
        .exists()
        .withMessage('Field is required')
        .isLength({min: 5, max: 255})
        .withMessage('Length must be from 5 to 255 symbol'),

    body('email')
        .exists()
        .custom(async (value) => {
            const user = await User.getByEmail(value);
            if (typeof user === undefined) {
                throw  new Error("Email is  exist");
            }
        })
        .withMessage('This email is exist'),

    body('password')
        .exists()
        .withMessage('Field is required')
        .isLength({min: 5, max: 255})
        .withMessage('Length must be from 5 to 255 symbol'),
]
;