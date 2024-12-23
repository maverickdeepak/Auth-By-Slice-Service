import { Router } from 'express';
const router = Router();

import { AuthController } from '../controllers/AuthController';

const authController = new AuthController();

router.post('/register', (req, res) => authController.register(req, res));

export default router;
