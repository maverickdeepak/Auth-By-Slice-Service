import { NextFunction, Request, Response, Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { UserService } from '../services/UserService';
import { AppDataSource } from '../config/data-source';
import { User } from '../entity/User';
import { logger } from '../config/logger';
import registerValidator from '../validators/resgister-validator';
import loginValidator from '../validators/login-validator';
import { TokenService } from '../services/TokenService';
import { RefreshToken } from '../entity/RefreshToken';
import { CredentialService } from '../services/CredentialService';

const router = Router();

// Retrieve the User repository from the AppDataSource
const userRepository = AppDataSource.getRepository(User);
// retrieve the RefreshToken repository from the AppDataSource
const refreshTokenRepository = AppDataSource.getRepository(RefreshToken);

// Initialize an instance of the UserService with the User repository
const userService = new UserService(userRepository);

// Initialize an instance of the TokenService
const tokenService = new TokenService(refreshTokenRepository);

// Initialize an instance of the CredentialService
const credentialService = new CredentialService();

// Initialize an instance of the AuthController and inject the UserService as a dependency
const authController = new AuthController(
    userService,
    logger,
    tokenService,
    credentialService
);

// Define a POST route for user registration and delegate the request handling to the AuthController's register method
router.post(
    '/register',
    registerValidator,
    (req: Request, res: Response, next: NextFunction) => {
        void authController.register(req, res, next);
    }
);

// Define a POST route for user login and delegate the request handling to the AuthController's login method
router.post(
    '/login',
    loginValidator,
    (req: Request, res: Response, next: NextFunction) => {
        void authController.login(req, res, next);
    }
);

// Define a GET route for retrieving the authenticated user's information and delegate the request handling to the AuthController's getSelf method
router.get('/self', (req: Request, res: Response, next: NextFunction) => {
    void authController.getSelf(req, res, next);
});

// Export the configured router so it can be used in other parts of the application
export default router;
