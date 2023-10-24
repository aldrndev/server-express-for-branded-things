const request = require('supertest');
const app = require('../app');
const { User } = require('../models');

describe('POST /login', () => {
  let userEmail = 'exampleuser@mail.com';
  let userPassword = '123456abcdef';
  let username = 'exampleuser';
  let userRole = 'user';

  beforeEach(async () => {
    await User.create({
      email: userEmail,
      password: userPassword,
      username: username,
      role: userRole,
      phoneNumber: '9876543210',
      address: 'Some Address',
    });
  });

  afterEach(async () => {
    await User.destroy({
      where: { email: userEmail },
    });
  });

  it('should allow a valid user to log in and return the correct response', async () => {
    const res = await request(app)
      .post('/login')
      .send({ email: userEmail, password: userPassword });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('data.access_token');
    expect(res.body.data.message).toBe(
      `User ${username} logged in successfully`
    );
    expect(res.body.data.user).toEqual({
      id: expect.any(Number),
      email: userEmail,
      username: username,
      role: userRole,
    });
  });

  it('should not allow a user to log in with an incorrect password and return the correct error response', async () => {
    const res = await request(app)
      .post('/login')
      .send({ email: userEmail, password: 'IncorrectPassword123' });

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty('statusCode', 401);
    expect(res.body).toHaveProperty('message', 'Invalid Username/Password');
  });

  it('should not allow a user to log in with a non-existent email and return the correct error response', async () => {
    const res = await request(app)
      .post('/login')
      .send({ email: 'nonexistentuser@mail.com', password: userPassword });

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty('statusCode', 401);
    expect(res.body).toHaveProperty('message', 'Invalid Username/Password');
  });
});
