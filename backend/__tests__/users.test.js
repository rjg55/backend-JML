const app = require(`${__dirname}/../app.js`);
const mongoose = require("mongoose");
const { seedDB } = require(`${__dirname}/../seed.js`);
const dotenv = require("dotenv");
const request = require("supertest");
const Users = require(`${__dirname}/../schemas/user-schema.js`);

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

describe("GET /api/users/:_id", () => {
  test("200: returns a specific user object with correct properties", async () => {
    const allUsers = await Users.find({});
    const firstUserId = allUsers[0]._id;
    return request(app)
      .get(`/api/users/${firstUserId}`)
      .expect(200)
      .then(({ body }) => {
        expect(body.user).toEqual(
          expect.objectContaining({
            _id: String(firstUserId),
            username: "janester",
          })
        );
      });
  });
});

describe("POST /api/users/", () => {
  test("201: adds user to the database and responds with newly created user", async () => {
    const newUser = {
      firstName: "George",
      lastName: "Worsnop",
      username: "Snop",
      password: "George123",
      email: "georgegeorge@gmail.com",
      phoneNumber: "07802347149",
      dateOfBirth: "1995-12-01",
    };
    return request(app)
      .post(`/api/users/`)
      .send(newUser)
      .expect(201)
      .then((res) => {
        const postedUser = res.body.user;
        expect(postedUser).toEqual(
          expect.objectContaining({
            firstName: "George",
            lastName: "Worsnop",
            username: "Snop",
            password: "George123",
            email: "georgegeorge@gmail.com",
            phoneNumber: "07802347149",
            dateOfBirth: "1995-12-01T00:00:00.000Z",
          })
        );
      });
  });
  test("400: throws error when input is incomplete", async () => {
    const newUser = {
      username: "Snop",
    };
    return request(app)
      .post(`/api/users/`)
      .send(newUser)
      .expect(400)
      .then((result) => {
        expect(result.text).toEqual("Path `phoneNumber` is required.");
      });
  });
});

describe("DELETE: /api/users/:_id", () => {
  test("204: responds with 204 and returns nothing", async () => {
    const allUsers = await Users.find({});
    const firstUserId = allUsers[0]._id;
    return request(app).delete(`/api/users/${firstUserId}`).expect(204);
  });
});

describe("PATCH /api/users/:_id", () => {
  test("200, responds with the updated user", async () => {
    const editUser = {
      firstName: "George",
      lastName: "Worsnop",
      username: "Snop",
    };
    const allUsers = await Users.find({});
    const firstUserId = allUsers[0]._id;
    return request(app)
      .patch(`/api/users/${firstUserId}`)
      .send(editUser)
      .expect(200)
      .then(({ body }) => {
        expect(body.user).toEqual(
          expect.objectContaining({
            firstName: "George",
            lastName: "Worsnop",
            username: "Snop",
          })
        );
      });
  });
});
