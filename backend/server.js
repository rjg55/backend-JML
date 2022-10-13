const app = require("./app.js");
const connectDB = require(`${__dirname}/config/db.js`);

const ENV = process.env.NODE_ENV || "development";

require("dotenv").config({
  path: `${__dirname}/../.env.${ENV}`,
});

connectDB();
const { PORT = 8080 } = process.env || 5000;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
