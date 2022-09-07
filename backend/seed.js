const mongoose = require("mongoose");
const Events = require("./schemas/event-schema");
const Users = require("./schemas/user-schema");
const Groups = require("./schemas/group-schema");
const EventsMessages = require("./schemas/event-message-schema");
const dotenv = require("dotenv");

const seedUsers = [
  {
    firstName: "Jane",
    lastName: "Harrison",
    username: "janester",
    password: "jane1234",
    email: "jane@gmail.com",
    phoneNumber: "07791210455",
    dateOfBirth: "2001-09-18",
  },
  {
    firstName: "John",
    lastName: "Smith",
    username: "JonnyBoy",
    password: "john1234",
    email: "john@gmail.com",
    phoneNumber: "07891233455",
    dateOfBirth: "1999-02-30",
  },
  {
    firstName: "Max",
    lastName: "Payne",
    username: "Payney",
    password: "payne1234",
    email: "max@gmail.com",
    phoneNumber: "07891233781",
    dateOfBirth: "1989-03-19",
  },
  {
    firstName: "Susan",
    lastName: "Thatcher",
    username: "susu",
    password: "susan1234",
    email: "susan@gmail.com",
    phoneNumber: "07811209856",
    dateOfBirth: "2000-10-10",
  },
  {
    firstName: "Greg",
    lastName: "Stevens",
    username: "BigGreg",
    password: "GregIsGreat123",
    email: "BigGreg@gmail.com",
    phoneNumber: "07802347146",
    dateOfBirth: "1983-12-01",
  },
];

const seedEvents = [
  {
    title: "Off Road Biking",
    category: "outdoors",
    description: "Riding mountain bikes",
    location: "Lake District",
    coords: { lat: 53.47223, long: -2.23817 },
    startTime: "2022-09-03T17:07:43.438+00:00",
    endTime: "2022-09-03T18:07:43.438+00:00",
    host: "janester",
    guests: [],
    active: true,
    group: "",
  },
  {
    title: "Egg and Spoon race",
    category: "sport",
    description: "Hard boiled eggs. No glue.",
    location: "Canada",
    coords: { Lat: 49.22671, Long: -92.07467 },
    startTime: "2022-09-03T17:07:43.438+00:00",
    endTime: "2022-09-03T18:07:43.438+00:00",
    host: "janester",
    guests: [],
    active: true,
    group: "",
  },
  {
    title: "Stamp collecting",
    category: "hobbies",
    description: "No casuals, professional hobbyists only",
    location: "The Bahamas",
    coords: { Lat: 24.41562, Long: -77.64479 },
    startTime: "2022-09-03T17:07:43.438+00:00",
    endTime: "2022-09-03T18:07:43.438+00:00",
    host: "janester",
    guests: [],
    active: true,
    group: "",
  },
  {
    title: "rave @ Bowlers",
    category: "Nightlife",
    description: "HTID gig in Manchester",
    location: "Manchester",
    coords: { lat: 53.47245, long: 21.23817 },
    startTime: "2022-09-03T17:07:43.438+00:00",
    endTime: "2022-09-03T18:07:43.438+00:00",
    host: "janester",
    guests: [],
    active: true,
    group: "",
  },
  {
    title: "cow tipping",
    category: "Hobby",
    description: "Abusing cattle for fun",
    location: "A field",
    coords: { lat: 58.47345, long: 4.29617 },
    startTime: "2022-09-03T17:07:43.438+00:00",
    endTime: "2022-09-03T18:07:43.438+00:00",
    host: "BigGreg",
    guests: [],
    active: true,
    group: "",
  },
  {
    title: "Bowling",
    category: "casual fun",
    description: "Hey cousin, wanna go bowling?",
    location: "Bowling Alley, Leeds",
    coords: { lat: 53.80409, long: -1.58193 },
    startTime: "2022-09-03T17:07:43.438+00:00",
    endTime: "2022-09-03T18:07:43.438+00:00",
    host: "BigGreg",
    guests: [],
    active: true,
    group: "",
  },
  {
    title: "Unicycling crash course",
    category: "sport",
    description: "Arrive on two wheels, leave on one!",
    location: "Angola",
    coords: {
      Lat: -16.11928,
      Long: 12.57687,
    },
    startTime: "2022-09-03T17:07:43.438+00:00",
    endTime: "2022-09-03T18:07:43.438+00:00",
    host: "BigGreg",
    guests: [],
    active: true,
    group: "",
  },
];

const seedGroups = [
  {
    title: "BigGregs Big Fun",
    category: "hobbies",
    description: "this is a description",
    members: [{ id: "blue" }],
    admin: "BigGreg",
  },
  {
    title: "The outdoor people",
    category: "outdoors",
    description: "this is a description",
    members: [{ id: "blue" }, { id: "red" }],
    admin: "BigGreg",
  },
  {
    title: "We like movies",
    category: "daytrips",
    description: "this is a description",
    members: [{ id: "blue" }, { id: "red" }, { id: "yellow" }],
    admin: "BigGreg",
  },
  {
    title: "Janesters small fun",
    category: "hobbies",
    description: "this is a description",
    members: [
      { id: "blue" },
      { id: "red" },
      { id: "yerllow" },
      { id: "werfv" },
      { id: "wetvwe" },
      { id: "edtvwertvwetv" },
      { id: "yiuo" },
      { id: "yewycecn" },
      { id: "gary" },
    ],
    admin: "janester",
  },
  {
    title: "Film lovers unite",
    category: "film",
    description: "Friday film trips!",
    members: [
      { id: "blue" },
      { id: "red" },
      { id: "yerllow" },
      { id: "werfv" },
      { id: "wetvwe" },
      { id: "edtvwertvwetv" },
      { id: "yiuo" },
      { id: "yewycecn" },
    ],
    admin: "janester",
  },
  {
    title: "Walking all over",
    category: "sport",
    description: "Walking club, we go on weekend trips to the Peak District",
    members: [],
    admin: "janester",
  },
];

const seedEventMessages = [
  {
    userTag: "BigGreg",
    message: "this is a event comment to discuss things about the event",
    eventTag: "Unicycling crash course",
  },
  {
    userTag: "BigGreg",
    message: "this is a event comment to discuss things about the event",
    eventTag: "Unicycling crash course",
  },
  {
    userTag: "janester",
    message: "this is a event comment to discuss things about the event",
    eventTag: "Unicycling crash course",
  },
];

exports.seedDB = async () => {
  await Users.deleteMany({});
  await Events.deleteMany({});
  await Groups.deleteMany({});
  await EventsMessages.deleteMany({});

  await Users.insertMany(seedUsers);
  // request users id's
  const janeUser = await Users.findOne({ username: "janester" });
  const gregUser = await Users.findOne({ username: "BigGreg" });

  seedEvents.forEach((event) => {
    if (event.host === "janester") {
      event.host = janeUser._id;
    } else {
      event.host = gregUser._id;
    }
  });

  await Events.insertMany(seedEvents);

  const unicycleEvent = await Events.findOne({
    title: "Unicycling crash course",
  });

  seedEventMessages.forEach((msg) => {
    if (msg.userTag === "BigGreg") {
      msg.userTag = gregUser._id;
    }
    if (msg.userTag === "janester") {
      msg.userTag = janeUser._id;
    }
    msg.eventTag = unicycleEvent._id;
  });

  await EventsMessages.insertMany(seedEventMessages);

  seedGroups.forEach((group) => {
    if (group.admin === "BigGreg") {
      group.admin = gregUser._id;
    }
    if (group.userTag === "janester") {
      group.admin = janeUser._id;
    }
  });

  await Groups.insertMany(seedGroups);
};

// seedDB().then(() => {
//   mongoose.connection.close();
// });
