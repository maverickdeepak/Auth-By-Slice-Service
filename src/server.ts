import { Config } from './config';
import app from './app';
import { logger } from './config/logger';

const starServer = () => {
    const PORT = Config.PORT;
    try {
        app.listen(PORT, () => {
            logger.info(`🏆Listening on port ${PORT}`, {
                service: 'auth-service',
                port: PORT,
            });
        });
    } catch (error) {
        console.log('💥 Error in Server.ts file', error);
        process.exit(1);
    }
};

starServer();
