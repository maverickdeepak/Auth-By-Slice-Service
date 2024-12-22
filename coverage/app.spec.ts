import request from 'supertest'
import app from '../src/app';

describe('app', () => {
    it('should return status code 200', async () => {
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        const response = await request(app).get('/').send()
        expect(response.status).toBe(200)
    });
});
