const {validationResult} = require('express-validator');
const HttpException = require('../exceptions/httpException');
const mainController = require('../controller/mainController');
const List = require('../models/list');

class listController extends mainController {

    index = async (req, res) => {
        var result = await List.find(req.query, req.user.user_id);
        res.json({'data': result});
    }

    show = async (req, res) => {
        var result = await List.getById(req.params.id);

        res.send(JSON.stringify(result));
    }

    create = async (req, res) => {
        if (this.checkValidation(req, res) && req.user) {

            const result = await List.create(req.body, req.user.user_id);
            if (!result) {
                throw new HttpException(500, 'Something went wrong');
            }

            res.status(201).send('List was created!');
        }
    }

    update = async (req, res) => {
        if (this.checkValidation(req, res)) {

            const result = await List.update(req.body, req.params.id);

            if (!result) {
                throw new HttpException(500, 'Something went wrong');
            }

            res.status(201).send('List was updated');

        }
    };

    delete = async (req, res) => {
        if (this.checkValidation(req, res)) {
            const result = await List.delete(req.params.id);

            if (!result) {
                throw new HttpException(500, 'Something went wrong');
            }

            res.status(201).send('List was deleted');
        }
    }

    close = async (req, res) => {
        if (this.checkValidation(req, res)) {
            const result = await List.closed(req.params.id);

            if (!result) {
                throw new HttpException(500, 'Something went wrong');
            }

            res.status(201).send('List was closed');
        }
    }
}

module.exports = new listController;
