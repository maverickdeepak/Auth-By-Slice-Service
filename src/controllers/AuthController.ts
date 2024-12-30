import express from 'express';

import { RegisterUserRequest } from '../types';
import { UserService } from '../services/UserService';
import { Logger } from 'winston';
import { validationResult } from 'express-validator';

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
        const result = validationResult(req);
        if (!result.isEmpty()) {
            res.status(400).json({
                errors: result.array(),
            });
            return;
        }

        // Extract user data from the request body
        const { firstName, lastName, email, password } = req.body;
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
            const accessToken = 'accessToken=helloworld';
            const refreshToken = 'refreshToken=helloworld';

            res.cookie('accessToken', accessToken, {
                domain: 'localhost',
                sameSite: 'strict',
                maxAge: 1000 * 60 * 60,
                httpOnly: true,
                secure: false,
                path: '/',
            });

            res.cookie('refreshToken', refreshToken, {
                domain: 'localhost',
                sameSite: 'strict',
                maxAge: 1000 * 60 * 60 * 24 * 30,
                httpOnly: true,
                secure: false,
                path: '/',
            });
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
