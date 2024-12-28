import { body } from 'express-validator';

export default [
    body('email').notEmpty().trim().withMessage('Email is required.'),
];
