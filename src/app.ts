import 'reflect-metadata';
import express from 'express';
import { logger } from './config/logger';
import { HttpError } from 'http-errors';
import authRoutes from './routes/auth';

const app = express();

app.get('/', (req: express.Request, res: express.Response) => {
    res.send('Hello World!');
});

app.use('/auth', authRoutes);

// Global error-handling middleware
app.use(
    (
        err: HttpError,
        req: express.Request,
        res: express.Response,
        _next: express.NextFunction
    ) => {
        logger.error(err.message, {});
        console.error(err.stack ?? 'No stack trace available'); // Log the error stack
        res.status(
            err.status && Number.isInteger(err.status) ? err.status : 500
        ).json({
            error: [
                {
                    type: err.name,
                    message: err.message,
                    status: err.status,
                    stack: err.stack,
                },
            ],
        });
    }
);

export default app;
