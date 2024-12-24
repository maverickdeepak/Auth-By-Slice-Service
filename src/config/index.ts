import { config } from 'dotenv';
import path from 'node:path';

config({
    path: path.join(__dirname, `../../.env.${process.env.NODE_ENV}`),
});

const PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

export const Config = Object.freeze({
    PORT,
    NODE_ENV,
    DB_HOST,
    DB_PORT,
    DB_USERNAME,
    DB_PASSWORD,
    DB_NAME,
});
