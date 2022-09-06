const app = require(`${__dirname}/../app.js`);
const mongoose = require("mongoose");
const { seedDB } = require(`${__dirname}/../seed.js`);
const dotenv = require("dotenv");
const request = require("supertest");

const Groups = require(`${__dirname}/../schemas/group-schema.js`);
const Events = require(`${__dirname}/../schemas/event-schema.js`);
const Users = require(`${__dirname}/../schemas/user-schema.js`);
const EventMessages = require(`${__dirname}/../schemas/event-message-schema.js`);

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
  //   db = await connection.db(globalThis.__MONGO_DB_NAME__);
  //Might need this ^^^^^
});

beforeEach(() => {
  return seedDB();
});
afterAll(() => {
  mongoose.connection.close();
});

// test to test connection
describe("GET /api/users", () => {
  test("Testing connection to DB", () => {
    return request(app).get("/api/users").expect(200);
  });
});
