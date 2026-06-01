import { Config } from './config';
import app from './app';
import { logger } from './config/logger';
import { AppDataSource } from './config/data-source';

const starServer = async () => {
    const PORT = Config.PORT;
    try {
        await AppDataSource.initialize();
        logger.info('✅ Database connection established', {
            service: 'auth-service',
        });
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

void starServer();
