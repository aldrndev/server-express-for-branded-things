const request = require('supertest');
const app = require('../app');
const { User } = require('../models');

describe('POST /register', () => {
  let userEmail = 'sampleuser@mail.com';
  let userPassword = 'abcdef123456';
  let username = 'sampleuser';
  let userPhoneNumber = '1234567890';
  let userAddress = 'Sample Address';

  afterEach(async () => {
    await User.destroy({ where: { email: userEmail } });
  });

  it('should register a new user successfully', async () => {
    const newUser = {
      username,
      email: userEmail,
      password: userPassword,
      phoneNumber: userPhoneNumber,
      address: userAddress,
    };
    const res = await request(app).post('/register').send(newUser);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('statusCode', 201);
    expect(res.body).toHaveProperty(
      'message',
      `Success register account ${username}`
    );
    expect(res.body.data).toHaveProperty('email', userEmail);
  });

  it('should return error when the email is already registered', async () => {
    await User.create({
      username,
      email: userEmail,
      password: userPassword,
      phoneNumber: userPhoneNumber,
      address: userAddress,
      role: 'admin',
    });

    const newUser = {
      username,
      email: userEmail,
      password: userPassword,
      phoneNumber: userPhoneNumber,
      address: userAddress,
    };
    const res = await request(app).post('/register').send(newUser);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('statusCode', 400);
    expect(res.body).toHaveProperty('message', [
      'Email address already in use!',
    ]);
  });

  it('should return error when the email is not provided', async () => {
    const newUser = {
      username,
      password: userPassword,
      phoneNumber: userPhoneNumber,
      address: userAddress,
    };
    const res = await request(app).post('/register').send(newUser);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('statusCode', 400);
    expect(res.body).toHaveProperty('message', ['Email is required']);
  });

  it('should return error when password is not provided', async () => {
    const newUser = {
      username,
      email: userEmail,
      phoneNumber: userPhoneNumber,
      address: userAddress,
    };
    const res = await request(app).post('/register').send(newUser);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('statusCode', 400);
    expect(res.body).toHaveProperty('message', ['Password is required']);
  });

  it('should return error when email format is invalid', async () => {
    const newUser = {
      username,
      email: 'invalidemailformat',
      password: userPassword,
      phoneNumber: userPhoneNumber,
      address: userAddress,
    };
    const res = await request(app).post('/register').send(newUser);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('statusCode', 400);
    expect(res.body).toHaveProperty('message', ['Format email is invalid']);
  });

  it('should return error when password is less than 5 characters', async () => {
    const newUser = {
      username,
      email: userEmail,
      password: 'abc',
      phoneNumber: userPhoneNumber,
      address: userAddress,
    };
    const res = await request(app).post('/register').send(newUser);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('statusCode', 400);
    expect(res.body).toHaveProperty('message', [
      'Password must be at least 5 characters',
    ]);
  });
});
