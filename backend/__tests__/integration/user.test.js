import request from 'supertest';
import app from '../../src/app.js';

describe('User', () => {
    it('should be able to register', async () => {
        const response = await request(app)
            .post('/user/create')
            .send({
                name: 'victor',
                email: 'e@e.com',
                password: '123456',
            });

        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('name');
        expect(response.body).toHaveProperty('email');
    });
});
