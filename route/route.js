const express = require("express");
const router = express.Router()
var bodyParser = require('body-parser')

const listController = require('../controller/listController')
const {searchList} = require('../requestValidation/list/searchList')
const {createList} = require('../requestValidation/list/createList')
const {updateList} = require('../requestValidation/list/updateList')
const {closeList} = require('../requestValidation/list/closeList')
const {registration} = require('../requestValidation/auth/registration');
const {login} = require('../requestValidation/auth/login');
const authController = require('../controller/authController');
const authMiddlevare = require('../middlaware/auth');


router.use(bodyParser.json());

router.post("/reqistration", registration, authController.registration);
router.post("/login", login, authController.login);


router.get('/list', authMiddlevare, listController.index);
router.get('/list/:id', authMiddlevare, listController.show);
router.post('/list', authMiddlevare, createList, listController.create);
router.patch('/list/:id', authMiddlevare, updateList, listController.update);
router.delete('/list/:id', authMiddlevare, closeList, listController.close);

module.exports = router;
