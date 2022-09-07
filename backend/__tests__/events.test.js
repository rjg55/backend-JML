const app = require(`${__dirname}/../app.js`);
const mongoose = require("mongoose");
const { seedDB } = require(`${__dirname}/../seed.js`);
const dotenv = require("dotenv");
const request = require("supertest");
const Events = require(`${__dirname}/../schemas/event-schema.js`);

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
  test("200: returns an events object containing the properties set by the schema", () => {
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
});

describe("GET /api/events/:event_id", () => {
  test("200: returns a specific event object with correct properties", async () => {
    const allEvents = await Events.find({});
    const firstEventId = allEvents[0]._id;
    return request(app)
      .get(`/api/events/${firstEventId}`)
      .expect(200)
      .then(({ body }) => {
        expect(body.event).toEqual({
          _id: String(firstEventId),
          title: "Off Road Biking",
          category: "outdoors",
          description: "Riding mountain bikes",
          location: "Lake District",
          coords: { lat: 53.47223, long: -2.23817 },
          startTime: "2022-09-03T17:07:43.438Z",
          endTime: "2022-09-03T18:07:43.438Z",
          host: expect.any(String),
          guests: [],
          active: true,
          group: "",
          __v: 0,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        });
      });
  });
});

describe("POST /api/events/", () => {
  test("201: adds event to the database and responds with newly created event", async () => {
    const newEvent = {
      title: "Test Event",
      category: "Test",
      description: "This is a test event",
      location: "Jest",
      coords: { lat: 50.0, long: 0.0 },
      startTime: "2022-09-03T17:07:43.438Z",
      endTime: "2022-09-03T18:07:43.438Z",
      host: "TestHostID1234",
      guests: [],
      active: true,
      group: "",
    };
    return request(app)
      .post(`/api/events/`)
      .send(newEvent)
      .expect(201)
      .then((res) => {
        const postedEvent = res.body.event;
        expect(postedEvent).toEqual(
          expect.objectContaining({
            title: "Test Event",
            category: "Test",
            description: "This is a test event",
            location: "Jest",
            coords: { lat: 50.0, long: 0.0 },
            startTime: "2022-09-03T17:07:43.438Z",
            endTime: "2022-09-03T18:07:43.438Z",
            host: "TestHostID1234",
            guests: [],
            active: true,
            group: "",
          })
        );
      });
  });
  test("400: throws error when input is incomplete", async () => {
    const newEvent = {
      title: "Test Event",
    };
    return request(app)
      .post(`/api/events/`)
      .send(newEvent)
      .expect(400)
      .then((result) => {
        expect(result.text).toEqual("Path `host` is required.");
      });
  });
});

describe("DELETE: /api/events/:event_id", () => {
  test("204: responds with 204 and returns nothing", async () => {
    const allEvents = await Events.find({});
    const firstEventId = allEvents[0]._id;
    return request(app).delete(`/api/events/${firstEventId}`).expect(204);
  });
});

describe("PATCH /api/events/:event_id", () => {
  test("200, responds with the updated event", async () => {
    const editEvent = {
      title: "Test Event",
      category: "Test",
      description: "This is a test event",
    };
    const allEvents = await Events.find({});
    const firstEventId = allEvents[0]._id;
    return request(app)
      .patch(`/api/events/${firstEventId}`)
      .send(editEvent)
      .expect(200)
      .then(({ body }) => {
        expect(body.event).toEqual(
          expect.objectContaining({
            title: "Test Event",
            category: "Test",
            description: "This is a test event",
          })
        );
      });
  });
});
