const app = require(`${__dirname}/../app.js`);
const mongoose = require('mongoose');
const { seedDB } = require(`${__dirname}/../seed.js`);
const dotenv = require('dotenv');
const request = require('supertest');

dotenv.config({
  path: `${__dirname}/../.env.test`
});

beforeAll(async () => {
  connection = await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log('Connected, seeding.');
    })
    .catch((err) => {
      console.log(err);
    });
});

beforeEach(() => {
  return seedDB();
});
afterAll(() => {
  mongoose.connection.close();
});

// test to test connection
describe('\nGET /api/users\n', () => {
  test('returns a user object containing the properties set by the schema', () => {
    return request(app).get('/api/users').expect(200).then(({ body }) => {
      expect(Array.isArray(body.users)).toBe(true);
      expect(body.users.length).toBeGreaterThan(0);
      body.users.forEach((user) => {
        expect.objectContaining({
          _id: expect.any(String),
          firstName: expect.any(String),
          lastName: expect.any(String),
          username: expect.any(String),
          password: expect.any(String),
          email: expect.any(String),
          phoneNumber: expect.any(String),
          dateOfBirth: expect.any(String)
        });
      });
    });
  });
});
