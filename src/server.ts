import { Config } from './config';
import app from './app';

const starServer = () => {
    const PORT = Config.PORT;
    try {
        app.listen(PORT, () => {
            console.log(`🏆 Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.log('💥 Error in Server.ts file', error);
        process.exit(1);
    }
};

starServer();
