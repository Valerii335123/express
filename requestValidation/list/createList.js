const {body} = require('express-validator');
const List = require('../../models/list')

exports.createList = [
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


    body('priority')
        .isIn(List.PRIORITY_ARRAY),

    body('parent_id')
        .custom(async (value) => {
            if (value) {
                const list = await List.getById(value);
                if (typeof list === undefined) {
                    throw  new Error("Parent does not exist");
                }
            }
        })
        .withMessage('This list not found')

];