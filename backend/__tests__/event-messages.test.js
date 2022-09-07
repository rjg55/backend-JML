const app = require(`${__dirname}/../app.js`);
const mongoose = require('mongoose');
const { seedDB } = require(`${__dirname}/../seed.js`);
const dotenv = require('dotenv');
const request = require('supertest');
require('jest-sorted');
const EventsMessages = require('../schemas/event-message-schema');
const Events = require('../schemas/event-schema');

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

describe('\nGET all /api/event-messages/event/:event_id\n', () => {
  test('returns an array of messages bu event id', async () => {
    const event = await Events.find({});
    const event_id = event[0]._id;
    return request(app)
      .get(`/api/event-messages/events/${event_id}`)
      .expect(200)
      .then(({ body }) => {
        expect(Array.isArray(body.messages)).toBe(true);
      });
  });
  test('returns an object containing a user id, message, event id and createdAt property', async () => {
    const event = await Events.find({});
    const event_id = event[0]._id;
    return request(app)
      .get(`/api/event-messages/events/${event_id}`)
      .expect(200)
      .then(({ body }) => {
        body.messages.forEach(() => {
          expect.objectContaining({
            _id: expect.any(String),
            userTag: expect.any(String),
            message: expect.any(String),
            eventTag: expect.any(String),
            createdAt: expect.any(String)
          });
        });
      });
  });
  test('returns an array of messages sorted by most recently created', async () => {
    const event = await Events.find({});
    const event_id = event[0]._id;
    return request(app)
      .get(`/api/event-messages/events/${event_id}`)
      .expect(200)
      .then(({ body }) => {
        expect(body.messages).toBeSortedBy('createdAt', { descending: true });
      });
  });
});

describe('\nPOST new message on an event /api/event-messages/event/:event_id', () => {
  test('adds a message to an event', async () => {
    const events = await Events.find({});
    const event = events[0]._id;

    return request(app)
      .post(`/api/event-messages/events/${event}`)
      .send({ userTag: 'test', message: 'test' })
      .expect(201)
      .then(({ body }) => {
        expect(body.message).toEqual(
          expect.objectContaining({
            _id: expect.any(String),
            userTag: 'test',
            message: 'test',
            eventTag: expect.any(String),
            createdAt: expect.any(String)
          })
        );
      });
  });
});
