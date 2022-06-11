const mainController = require('../controller/mainController');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const HttpException = require("../exceptions/httpException");

class authContoroller extends mainController {

    registration = async (req, res) => {
        if (this.checkValidation(req, res)) {
            try {
                const {name, email, password} = req.body;
                var encryptedPassword = await bcrypt.hash(password, 10);
                const statusUserCreated = await User.create({
                    name,
                    email: email.toLowerCase(),
                    password: encryptedPassword,
                });

                if (statusUserCreated) {
                    var user = await User.getByEmail(email);

                    if (!user) {
                        throw new HttpException(500, 'Something went wrong');
                    }

                    var token = jwt.sign(
                        {user_id: user.id, email},
                        process.env.TOKEN_KEY,
                        {
                            expiresIn: "2h",
                        }
                    );
                    user.token = token;

                    res.status(201).json(user);
                }
            } catch (err) {
                console.log(err);
            }
        }
    }

    login = async (req, res) => {
        const {email, password} = req.body;
        var user = await User.getByEmail(email);

        if (user && await bcrypt.compare(password, user.password)) {
            var token = jwt.sign(
                {user_id: user.id, email},
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );
            user.token = token;

            res.status(200).json(user);
        } else res.status(401).json(['email or password is fail']);
    }

}

module.exports = new authContoroller();
