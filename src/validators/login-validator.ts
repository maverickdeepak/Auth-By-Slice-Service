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
    password: {
        notEmpty: true,
        errorMessage: 'Password is required.',
    },
});
