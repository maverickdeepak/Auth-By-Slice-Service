import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { UserService } from '../services/UserService';
import { AppDataSource } from '../config/data-source';
import { User } from '../entity/User';

const router = Router();

// Retrieve the User repository from the AppDataSource
const userRepository = AppDataSource.getRepository(User);

// Initialize an instance of the UserService with the User repository
const userService = new UserService(userRepository);

// Initialize an instance of the AuthController and inject the UserService as a dependency
const authController = new AuthController(userService);

// Define a POST route for user registration and delegate the request handling to the AuthController's register method
router.post('/register', (req, res) => authController.register(req, res));

// Export the configured router so it can be used in other parts of the application
export default router;
