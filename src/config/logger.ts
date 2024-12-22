import winston from 'winston';

export const logger = winston.createLogger({
    level: 'info',
    defaultMeta: {
        service: 'auth-service',
    },
    transports: [
        new winston.transports.File({
            level: 'info',
            dirname: 'logs',
            filename: 'app.log',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json(),
                winston.format.prettyPrint()
            ),
            silent: process.env.NODE_ENV === 'test',
        }),
        new winston.transports.File({
            level: 'error',
            dirname: 'logs',
            filename: 'error.log',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json(),
                winston.format.prettyPrint()
            ),
            silent: process.env.NODE_ENV === 'test',
        }),
        new winston.transports.Console({
            level: 'info',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json(),
                winston.format.prettyPrint()
            ),
            silent: process.env.NODE_ENV === 'test',
        }),
    ],
});
