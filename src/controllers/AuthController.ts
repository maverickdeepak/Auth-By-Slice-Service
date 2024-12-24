import express from 'express';

import { RegisterUserRequest } from '../types';
import { UserService } from '../services/UserService';

export class AuthController {
    // Initialize the AuthController with a UserService instance
    constructor(private userService: UserService) {}

    // Endpoint to handle user registration
    async register(req: RegisterUserRequest, res: express.Response) {
        // Extract user data from the request body
        const { firstName, lastName, email, password } = req.body;

        // Call the UserService to create a new user in the database
        await this.userService.createUser({
            firstName,
            lastName,
            email,
            password,
        });

        // Return a success response with status 201
        res.status(201).json({
            message: 'User created successfully',
        });
    }
}
