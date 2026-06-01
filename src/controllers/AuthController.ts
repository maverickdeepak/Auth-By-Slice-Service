import express from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { LoginUserRequest, RegisterUserRequest } from '../types';
import { UserService } from '../services/UserService';
import { Logger } from 'winston';
import { validationResult } from 'express-validator';
import { TokenService } from '../services/TokenService';
import { CredentialService } from '../services/CredentialService';

export class AuthController {
    // Initialize the AuthController with a UserService instance and logger
    constructor(
        private userService: UserService,
        private logger: Logger,
        private tokenService: TokenService,
        private credentialService: CredentialService
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
            const user = await this.userService.createUser({
                firstName,
                lastName,
                email,
                password,
            });

            this.logger.info(`User ${email} created successfully.`);

            const payload: JwtPayload = {
                sub: String(user.id),
                role: user.role,
            };

            // Generate an access token for the newly created user
            const accessToken = this.tokenService.generateAccessToken(payload);

            // Persist the refresh token in the database and generate a refresh token for the user
            const newRefreshToken =
                await this.tokenService.persistRefreshToken(user);

            // Generate a refresh token using the TokenService
            const refreshToken = this.tokenService.generateRefreshToken(
                payload,
                newRefreshToken
            );

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
                id: user.id,
            });
        } catch (err: unknown) {
            next(err as Error);
            return;
        }
    }

    // Endpoint to handle user login
    async login(
        req: LoginUserRequest,
        res: express.Response,
        next: express.NextFunction
    ) {
        const { email, password } = req.body;
        this.logger.debug(`Received login request for ${email}`);

        try {
            // Call the UserService to validate the user's credentials
            const user = await this.userService.validateUser(email, password);

            if (!user) {
                this.logger.warn(`Invalid login attempt for ${email}`);
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // compare the provided password with the stored hashed password
            const isPasswordValid =
                await this.credentialService.comparePassword(
                    password,
                    user.password
                );

            if (!isPasswordValid) {
                this.logger.warn(`Invalid login attempt for ${email}`);
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const payload: JwtPayload = {
                sub: String(user.id),
                role: user.role,
            };

            // Generate an access token for the authenticated user
            const accessToken = this.tokenService.generateAccessToken(payload);

            // Persist the refresh token in the database and generate a refresh token for the user
            const newRefreshToken =
                await this.tokenService.persistRefreshToken(user);

            // Generate a refresh token using the TokenService
            const refreshToken = this.tokenService.generateRefreshToken(
                payload,
                newRefreshToken
            );

            res.cookie('accessToken', accessToken, {
                domain: 'localhost',
                sameSite: 'strict',
                maxAge: 1000 * 60 * 60,
                httpOnly: true,
                secure: false,
            });

            res.cookie('refreshToken', refreshToken, {
                domain: 'localhost',
                sameSite: 'strict',
                maxAge: 1000 * 60 * 60 * 24 * 30,
                httpOnly: true,
                secure: false,
            });

            this.logger.info(`User ${email} logged in successfully.`);

            // Return a success response with status 200
            res.status(200).json({
                message: 'Login successful',
                id: user.id,
            });
        } catch (err: unknown) {
            next(err as Error);
            return;
        }
    }

    // Endpoint to retrieve the authenticated user's information
    getSelf(_req: express.Request, res: express.Response) {
        res.status(200).json({
            message: 'User information retrieved successfully',
        });
    }
}
