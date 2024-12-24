import { config } from 'dotenv';
import path from 'node:path';

config({
    path: path.join(__dirname, `../../.env.${process.env.NODE_ENV}`),
});

const PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV;

export const Config = Object.freeze({
    PORT,
    NODE_ENV,
});
