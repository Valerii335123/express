const {validationResult} = require('express-validator');

/**
 * Main controller
 */
class mainController {

    /**
     * funtion for check error validation
     * @param req
     * @param res
     * @returns {boolean}
     */
    checkValidation = (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.json({
                'message': 'error',
                'data': errors,
            });
            return false;
        }
        return true;
    }
}

module.exports = mainController