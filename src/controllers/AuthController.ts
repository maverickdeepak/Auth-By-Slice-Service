import express from 'express';

export class AuthController {
    register(req: express.Request, res: express.Response) {
        res.status(201).send('User created');
    }
}
