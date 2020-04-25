import request from 'supertest';
import app from '../../src/app';

describe('Session', () => {
    beforeAll(async () => {
        await request(app)
            .post('/user/create')
            .send({
                name: 'rafael',
                email: 'rf@mail.com',
                password: '123456',
                provider: false,
            });
    });

    it('should be able to create session', async () => {
        const response = await request(app)
            .post('/session')
            .send({
                email: 'rf@mail.com',
                password: '123456',
            });

        expect(response.body).toHaveProperty('user');
        expect(response.body).toHaveProperty('token');
    });

    it('should not be able to create session when schema fails', async () => {
        const response = await request(app)
            .post('/session')
            .send({
                email: 'rfailcom',
                password: '123456',
            });

        expect(response.status).toBe(400);
    });

    it('should not be able to create session when password fails', async () => {
        const response = await request(app)
            .post('/session')
            .send({
                email: 'rf@mail.com',
                password: '123466',
            });

        expect(response.status).toBe(400);
    });

    it('should not be able to create session when user not found', async () => {
        const response = await request(app)
            .post('/session')
            .send({
                email: 'rf2@mail.com',
                password: '123456',
            });

        expect(response.status).toBe(404);
    });
});
