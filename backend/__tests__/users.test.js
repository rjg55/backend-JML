const app = require(`${__dirname}/../app.js`);
const mongoose = require("mongoose");
const { seedDB } = require(`${__dirname}/../seed.js`);
const dotenv = require("dotenv");
const request = require("supertest");

dotenv.config({
  path: `${__dirname}/../.env.test`,
});

beforeAll(async () => {
  connection = await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Connected, seeding.");
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

describe("GET /api/users", () => {
  test("returns a status of 200 and an array of user objects", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        expect(Array.isArray(body.users)).toBe(true);
        expect(body.users.length).toBeGreaterThan(0);
      });
  });
  test("returns a status of 200 and an array of user objects containing the properties set by the schema", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        body.users.forEach((user) => {
          expect.objectContaining({
            _id: expect.any(String),
            firstName: expect.any(String),
            lastName: expect.any(String),
            username: expect.any(String),
            password: expect.any(String),
            email: expect.any(String),
            phoneNumber: expect.any(String),
            dateOfBirth: expect.any(String),
          });
        });
      });
  });
  test("returns an array of user objects sorted by passed query of username", () => {
    return request(app)
      .get("/api/users?sort_by=username")
      .expect(200)
      .then(({ body: { users } }) => {
        expect(users).toBeSortedBy("username", { descending: true });
      });
  });
  test("returns an array of user objects sorted by passed query of username ordered in by ascending", () => {
    return request(app)
      .get("/api/users?sort_by=username&order=asc")
      .expect(200)
      .then(({ body: { users } }) => {
        expect(users).toBeSortedBy("username", { descending: false });
      });
  });
  test("Returns a status of 400 bad request if passed an invalid sort_by query", () => {
    return request(app)
      .get("/api/users?sort_by=notASortBy")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
  test("Returns a status of 400 bad request if passed an invalid order query", () => {
    return request(app)
      .get("/api/users?sort_by=notASortBy&order=notAnOrder")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
});
