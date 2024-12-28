import express from 'express';

import { RegisterUserRequest } from '../types';
import { UserService } from '../services/UserService';
import { Logger } from 'winston';
import createHttpError from 'http-errors';

export class AuthController {
    // Initialize the AuthController with a UserService instance and logger
    constructor(
        private userService: UserService,
        private logger: Logger
    ) {}

    // Endpoint to handle user registration
    async register(
        req: RegisterUserRequest,
        res: express.Response,
        next: express.NextFunction
    ) {
        // Extract user data from the request body
        const { firstName, lastName, email, password } = req.body;
        if (!email) {
            const err = createHttpError(400, 'Email is required.');
            next(err);
            return;
        }
        this.logger.debug(`Received user registration request for ${email}`, {
            firstName,
            lastName,
            email,
        });
        try {
            // Call the UserService to create a new user in the database
            await this.userService.createUser({
                firstName,
                lastName,
                email,
                password,
            });

            this.logger.info(`User ${email} created successfully.`);
            // Return a success response with status 201
            res.status(201).json({
                message: 'User created successfully',
            });
        } catch (err) {
            next(err);
            return;
        }
    }
}
