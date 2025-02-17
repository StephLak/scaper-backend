import request from 'supertest';
import app from '../../../app';

it("fails when an email that doesn't exist is provided", async () => {
    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test2@test.com',
            password: 'password'
        })
        .expect(400);
});

it('fails when incorrect password is provided', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);
    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: 'another'
        })
        .expect(400);
});

it('responds with a token when valid credentials are provided', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test2@test.com',
            password: 'password'
        })
        .expect(201);
    const response = await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test2@test.com',
            password: 'password'
        })
        .expect(200);
    
    expect(response.body.token).toBeDefined();
});
