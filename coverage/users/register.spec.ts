import request from 'supertest';
import app from '../../src/app';

describe('register user block - POST - /auth/register', () => {
    describe('Happy path', () => {
        it('should return status code 201', async () => {
            const userData = {
                firstName: 'John',
                lastName: 'Doe',
                email: 'johndoe@gmail.com',
                password: 'password',
            }
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            const response = await request(app).post('/auth/register').send(userData);
            expect(response.status).toBe(201);
        });

        it('should return valid json', async () => {
            const userData = {
                firstName: 'John',
                lastName: 'Doe',
                email: 'johndoe@gmail.com',
                password: 'password',
            }

            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            const response = await request(app).post('/auth/register').send(userData);
            expect(response.type).toBe('application/json');
        });

        it("should persists user data in database", async () => {
            const userData = {
                firstName: 'John',
                lastName: 'Doe',
                email: 'johndoe@gmail.com',
                password: 'password',
            }
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            const response = await request(app).post('/auth/register').send(userData);

        })
    });
    describe('Sad path', () => {
        it('should return status code 400', async () => {});
    });
});
