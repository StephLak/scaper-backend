import request from 'supertest';
import app from '../../../app';

it('returns a 201 on successful registration', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test2@test.com',
            password: 'password'
        })
        .expect(201);
}, 10000);

it("returns a 400 with an invalid email", async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'testest.com',
            password: 'password'
        })
        .expect(400);
});

it('returns a 400 with an invalid password', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'p'
        })
        .expect(400);
});

it('returns a 400 with missing email or password', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com'
        })
        .expect(400);

    await request(app)
        .post('/api/users/signup')
        .send({
            password: 'password'
        })
        .expect(400);
});

it('does not allow duplicate emails', async () => {
    await request(app)
    .post('/api/users/signup')
    .send({
        email: 'test@test.com',
        password: 'password'
    })
    .expect(201);

    await request(app)
    .post('/api/users/signup')
    .send({
        email: 'test@test.com',
        password: 'password'
    })
    .expect(400);
});

it('returns 201 after successful registration', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test2@test.com',
            password: 'password'
        })
        .expect(201);
})