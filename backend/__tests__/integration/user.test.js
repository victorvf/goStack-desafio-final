import request from 'supertest';
import app from '../../src/app';

import truncate from '../util/truncate';
import factory from '../util/factories';

describe('User', () => {
    beforeEach(async () => {
        await truncate();
    });

    it('should be able to return an array', async () => {
        const response = await request(app).get('/users');

        expect(response.body).toStrictEqual([]);
    });

    it('should be able to register', async () => {
        const user = await factory.attrs('User');

        const response = await request(app)
            .post('/user/create')
            .send(user);

        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('name');
        expect(response.body).toHaveProperty('email');
    });

    it('should not be able to register', async () => {
        const user = await factory.attrs('User');

        await request(app)
            .post('/user/create')
            .send(user);

        const response = await request(app)
            .post('/user/create')
            .send(user);

        expect(response.status).toBe(400);
    });

    it('should not be able to register when schema fails', async () => {
        const user = await factory.attrs('User', { email: '1234' });

        const response = await request(app)
            .post('/user/create')
            .send(user);

        expect(response.status).toBe(400);
    });

    it('should be ablet to return one user', async () => {
        const user = await factory.attrs('User');

        const userResponse = await request(app)
            .post('/user/create')
            .send(user);

        const response = await request(app).get(
            `/user/${userResponse.body.id}`
        );

        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('name');
        expect(response.body).toHaveProperty('email');
        expect(response.body).toHaveProperty('admin');
    });

    it('should not be ablet to return one user', async () => {
        const response = await request(app).get(`/user/2`);

        expect(response.status).toBe(404);
    });

    it('should be able to delete one user', async () => {
        const user = await factory.attrs('User');

        const userResponse = await request(app)
            .post('/user/create')
            .send(user);

        const response = await request(app).delete(
            `/user/${userResponse.body.id}/delete`
        );

        expect(response.body).toHaveProperty('message');
    });

    it('should not be able to delete one user', async () => {
        const response = await request(app).delete(`/user/2/delete`);

        expect(response.status).toBe(404);
    });
});
