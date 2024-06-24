const { check, validationResult } = require('express-validator');

const validateBook = [
    check('title').not().isEmpty().withMessage('Title is required'),
    check('author')
        .not()
        .isEmpty()
        .withMessage('Description is required')
        .isLength({ min: 5, max: 20 })
        .withMessage('Min 5, Max 20'),
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

const validateRegister = [
    check('username')
        .not()
        .isEmpty()
        .withMessage('Username is required')
        .isLength({ max: 20 })
        .withMessage('Max length username is 20'),
    check('password')
        .not()
        .isEmpty()
        .withMessage('Password is reqired')
        .isLength({ min: 8 })
        .withMessage('Min length password is 8'),
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

const validateLogin = [
    check('username').not().isEmpty().withMessage('Username is required'),
    check('password')
        .not()
        .isEmpty()
        .withMessage('Password is reqired')
        .isLength({ min: 8 })
        .withMessage('Min length password is 8'),
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

module.exports = { validateBook, validateRegister, validateLogin };
