const joi = require("joi");

const signupValidation = (req, res, next) => {
    const schema = joi.object({
        name: joi.string().min(3).max(100).required(),
        email: joi.string().email().required(), // Ensuring valid email format
        password: joi.string().min(3).max(100).required()
    });

    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            message: "Bad Request",
            errors: error.details.map(err => err.message) // Extracts only the error messages
        });
    }
    next();
};

const loginValidation = (req, res, next) => { // Added req, res, next parameters
    const schema = joi.object({
        email: joi.string().email().required(), // Fixed missing email format validation
        password: joi.string().min(3).max(100).required()
    });

    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            message: "Bad Request",
            errors: error.details.map(err => err.message)
        });
    }
    next();
};

module.exports = {
    signupValidation,
    loginValidation
};
