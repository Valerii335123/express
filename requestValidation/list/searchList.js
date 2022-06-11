const {param} = require('express-validator');
const List = require('../../models/list')

exports.searchList = [
    param('title')
        .trim()
        .isString()
        // .custom(async (value) => {
        //     if (value) {
        //         const exist = await List.isHaveChildActive(value);
        //         if (exist.exist == 1) {
        //             throw  new Error("You dont can delete with child active");
        //         }
        //     }
        // })

        .withMessage('You dont can delete with child active'),

];