const mongoose = require('mongoose');
const Events = require('./schemas/event-schema');
const Users = require('./schemas/user-schema');

mongoose
  .connect(
    'mongodb+srv://JestMyLuck:PRSKM3AqDSbKAFRi@cluster0.scagup5.mongodb.net/test?retryWrites=true&w=majority'
  )
  .then(() => {
    console.log('Connected, seeding.');
  })
  .catch((err) => {
    console.log(err);
  });

const seedUsers = [
  {
    firstName: 'Jane',
    lastName: 'Harrison',
    username: 'janester',
    password: 'jane1234',
    email: 'jane@gmail.com',
    phoneNumber: '07791210455',
    dateOfBirth: '2001-09-18'
  },
  {
    firstName: 'John',
    lastName: 'Smith',
    username: 'JonnyBoy',
    password: 'john1234',
    email: 'john@gmail.com',
    phoneNumber: '07891233455',
    dateOfBirth: '1999-02-30'
  },
  {
    firstName: 'Max',
    lastName: 'Payne',
    username: 'Payney',
    password: 'payne1234',
    email: 'max@gmail.com',
    phoneNumber: '07891233781',
    dateOfBirth: '1989-03-19'
  },
  {
    firstName: 'Susan',
    lastName: 'Thatcher',
    username: 'susu',
    password: 'susan1234',
    email: 'susan@gmail.com',
    phoneNumber: '07811209856',
    dateOfBirth: '2000-10-10'
  }
];

const seedEvents = [
  {
    title: 'Off Road Biking',
    category: 'outdoors',
    description: 'Riding mountain bikes',
    location: 'Lake District',
    coords: { lat: 53.47223, long: -2.23817 },
    startTime: '2022-09-03T17:07:43.438+00:00',
    endTime: '2022-09-03T18:07:43.438+00:00',
    host: 'janester',
    guests: [],
    active: true,
    group: ''
  },
  {
    title: 'Egg and Spoon race',
    category: 'sport',
    description: 'Hard boiled eggs. No glue.',
    location: 'Canada',
    coords: { Lat: 49.22671, Long: -92.07467 },
    startTime: '2022-09-03T17:07:43.438+00:00',
    endTime: '2022-09-03T18:07:43.438+00:00',
    host: 'janester',
    guests: [],
    active: true,
    group: ''
  },
  {
    title: 'Stamp collecting',
    category: 'hobbies',
    description: 'No casuals, professional hobbyists only',
    location: 'The Bahamas',
    coords: { Lat: 24.41562, Long: -77.64479 },
    startTime: '2022-09-03T17:07:43.438+00:00',
    endTime: '2022-09-03T18:07:43.438+00:00',
    host: 'janester',
    guests: [],
    active: true,
    group: ''
  }
];

seedDB = async () => {
  await Users.deleteMany({});
  await Events.deleteMany({});
  await Users.insertMany(seedUsers);
  await Events.insertMany(seedEvents);
};

seedDB()
  .then(() => {
    mongoose.connection.close();
  })
  .catch((err) => {
    console.log(err, '<<<<<<<');
  });
