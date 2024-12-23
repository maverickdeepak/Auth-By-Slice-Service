import request from 'supertest';
import app from '../../src/app';
import { DataSource } from 'typeorm';
import { User } from '../../src/entity/User';
import { AppDataSource } from '../../src/config/data-source';
import { truncateTable } from '../utils';

describe('register user block - POST - /auth/register', () => {
    let connection: DataSource;

    beforeAll(async () => {
        // Initialize the database connection
        connection = await AppDataSource.initialize();
    });

    beforeEach(async () => {
        // await connection.dropDatabase(); // Drops all data and structure
        // await connection.synchronize(); // Recreates the database structure
        await truncateTable(connection)
    });

    afterAll(async () => {
        // Close the database connection after all tests
        // if (connection.isInitialized) {
        //     await connection.destroy();
        // }
    });

    describe('Happy path', () => {
        it('should return status code 201', async () => {
            const userData = {
                firstName: 'John',
                lastName: 'Doe',
                email: 'johndoe@gmail.com',
                password: 'password', // Add proper hashing logic
            };

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            const response = await request(app).post('/auth/register').send(userData);
            expect(response.status).toBe(201); // Verify status code
        });

        it('should return valid JSON', async () => {
            const userData = {
                firstName: 'John',
                lastName: 'Doe',
                email: 'johndoe@gmail.com',
                password: 'password',
            };

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            const response = await request(app).post('/auth/register').send(userData);
            expect(response.type).toBe('application/json'); // Verify content type
        });

        it('should persist user data in the database', async () => {
            const userData = {
                firstName: 'John',
                lastName: 'Doe',
                email: 'johndoe@gmail.com',
                password: 'password',
            };

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            await request(app).post('/auth/register').send(userData);

            // Retrieve the user data from the database
            const userRepository = connection.getRepository(User);
            const users = await userRepository.find();
            expect(users.length).toBe(1);
            expect(users[0].firstName).toBe('John');
            expect(users[0].lastName).toBe('Doe');
            expect(users[0].email).toBe('johndoe@gmail.com');
        });

        it("should return the ID of the newly created user", async () => {
            const userData = {
                firstName: 'John',
                lastName: 'Doe',
                email: 'johndoe@gmail.com',
                password: 'password',
            };

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            await request(app).post('/auth/register').send(userData);

            // Retrieve the user data from the database
            const userRepository = connection.getRepository(User);
            const users = await userRepository.find();
            expect(users.length).toBe(1);
            expect(users[0].id).toBeDefined();
        })
    });

    describe('Sad path', () => {
    });
});
