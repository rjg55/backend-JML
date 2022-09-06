const app = require(`${__dirname}/../app.js`);
const { request } = require("express");
const mongoose = require("mongoose");

const Groups = require(`${__dirname}/../schemas/group-schema.js`);
const Events = require(`${__dirname}/../schemas/event-schema.js`);
const Users = require(`${__dirname}/../schemas/user-schema.js`);
const EventMessages = require(`${__dirname}/../schemas/event-messages-schema.js`);

// dotenv.config({
//     path: `${__dirname}/.env.test`
//   });  WE MIGHT NEED THIS!!!!

// beforeAll(async () => {
//   connection = await MongoClient.connect(globalThis.__MONGO_URI__, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
//   db = await connection.db(globalThis.__MONGO_DB_NAME__);
// });

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
  return seed("data here!");
});
afterAll(() => {
  mongoose.connection.close().then(() => console.log("Closing connection"));
});

//test to test connection
describe("GET /api/users", () => {
  test("Testing connection to DB", () => {
    return request(app).get("/api/users").expect(200);
  });
});
