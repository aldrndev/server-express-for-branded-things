const request = require('supertest');
const app = require('../app');
const {
  sequelize,
  User,
  Product,
  Customer,
  Wishlist,
  Category,
} = require('../models/index');
const { hashPwd } = require('../helpers/bcrypt');
const { queryInterface } = sequelize;

let accessToken; // Declare a variable to store the access token

beforeAll(async () => {
  await User.create({
    username: 'admin',
    email: 'admin@mail.com',
    password: hashPwd('123456'),
    role: 'admin',
    phoneNumber: '1234567890',
    address: 'Jl. Admin No.1',
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  await Category.create({
    name: 'Electronics',
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  await Product.create({
    name: 'Tv',
    price: 1000000,
    stock: 10,
    CategoryId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  await Customer.create({
    email: 'customer@mail.com',
    password: hashPwd('123456'),
    role: 'customer',
    phoneNumber: '1234567890',
    address: 'Jl. Admin No.1',
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  await Wishlist.create({
    ProductId: 1,
    CustomerId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
});

afterAll(async () => {
  await queryInterface.bulkDelete('Wishlists', null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await queryInterface.bulkDelete('Products', null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await queryInterface.bulkDelete('Customers', null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await queryInterface.bulkDelete('Categories', null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await queryInterface.bulkDelete('Users', null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

describe('GET /pub/product', () => {
  it('Successfully get product without login', async () => {
    const res = await request(app).get('/pub/product');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data.length).toBeGreaterThanOrEqual(1);
  });

  it('Successfully get product without login with a search parameter', async () => {
    const res = await request(app).get('/pub/product').query({ search: 'Tv' });
    expect(res.status).toBe(200);
    expect(res.body.data[0].name).toContain('Tv');
  });

  it('Successfully get product with parameter', async () => {
    let id = 1;
    const res = await request(app).get('/pub/product/' + id);
    expect(res.status).toBe(200);
    expect(res.body.data.getProduct).toHaveProperty('name', 'Tv');
  });

  it('Should fail to get a product with non-existent parameter', async () => {
    let id = 1000;
    const res = await request(app).get('/pub/product/' + id);
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('message', 'Product detail not found');
  });
});
