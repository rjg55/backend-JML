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

describe("GET /api/events", () => {
  test("returns an events object containing the properties set by the schema", () => {
    return request(app)
      .get("/api/events")
      .expect(200)
      .then(({ body }) => {
        expect(Array.isArray(body.events)).toBe(true);
        expect(body.events.length).toBeGreaterThan(0);
        body.events.forEach((event) => {
          expect.objectContaining({
            _id: expect.any(String),
            title: expect.any(String),
            category: expect.any(String),
            description: expect.any(String),
            location: expect.any(String),
            coords: expect.any(Object),
            startTime: expect.any(Date),
            endTime: expect.any(Date),
            avatar: expect.any(String),
            host: expect.any(String),
            guests: expect.any(Array),
            active: expect.any(Boolean),
            group: expect.any(String),
          });
        });
      });
  });
  test("200: returns events ordered by start time descending by default", () => {
    return request(app)
      .get("/api/events")
      .expect(200)
      .then(({ body }) => {
        expect(body.events.length).toBeGreaterThan(0);
        expect(body.events).toBeSortedBy("startTime", {
          descending: true,
          coerce: true,
        });
      });
  });
  test("200: returns with all events with same category", () => {
    return request(app)
      .get("/api/events?category=sport")
      .expect(200)
      .then(({ body }) => {
        expect(body.events.length).toBeGreaterThan(0);
        console.log(body.events);
        body.events.forEach((event) => {
          expect(event.category).toBe("sport");
        });
      });
  });
  test("200: endpoint now accepts multiple queries", () => {
    return request(app)
      .get("/api/events?sort_by=title&order=1")
      .expect(200)
      .then(({ body }) => {
        expect(Array.isArray(body.events)).toBe(true);
        expect(body.events.length).toBe(7);
        expect(body.events).toBeSortedBy("title", {
          descending: false,
          coerce: true,
        });
        expect(body.events[0]).toEqual({
          _id: expect.any(String),
          title: "Bowling",
          category: "casual fun",
          description: "Hey cousin, wanna go bowling?",
          location: "Bowling Alley, Leeds",
          coords: { lat: 53.80409, long: -1.58193 },
          startTime: expect.any(String),
          endTime: expect.any(String),
          host: expect.any(String),
          guests: [],
          active: true,
          group: "",
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          __v: 0,
        });
      });
  });
  // describe("GET /api/events/:event_id", () => {
  //   test("returns a specific event object with correct properties", () => {

  //     const allEvents = await Events.find({});
  //     const firstEventId = allEvents[0]._id

  //     return request(app)
  //       .get(`/api/events/${firstEventId}`)
  //       .expect(200)
  //       .then(({ body }) => {
  //           expect(body).toEqual({
  //             _id: firstEventId,
  //             title: "Hello"

  //           });
  //         });
  //       });
  //   });
});
