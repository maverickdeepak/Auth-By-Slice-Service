import winston from 'winston';

const createFileTransport = (level: string, filename: string) =>
    new winston.transports.File({
        level,
        dirname: 'logs',
        filename,
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(),
            winston.format.prettyPrint()
        ),
        silent: process.env.NODE_ENV === 'test',
    });

const createConsoleTransport = () =>
    new winston.transports.Console({
        level: 'info',
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(),
            winston.format.prettyPrint()
        ),
        silent: process.env.NODE_ENV === 'test',
    });

export const logger = winston.createLogger({
    level: 'info',
    defaultMeta: { service: 'auth-service' },
    transports: [
        createFileTransport('info', 'app.log'),
        createFileTransport('error', 'error.log'),
        createConsoleTransport(),
    ],
});
