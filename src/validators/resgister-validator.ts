// import { body } from 'express-validator';

import { checkSchema } from 'express-validator';

export default checkSchema({
    email: {
        errorMessage: 'Email is required.',
        notEmpty: true,
        trim: true,
        isEmail: {
            errorMessage: 'Email is invalid.',
        },
    },
    firstName: {
        notEmpty: true,
        errorMessage: 'First name is required.',
    },
    password: {
        notEmpty: true,
        errorMessage: 'Password is required.',
        isLength: {
            errorMessage: 'Password must be at least 8 characters long.',
            options: { min: 8 },
        },
    },
});

// export default [
//     body('email').notEmpty().trim().withMessage('Email is required.'),
// ];
