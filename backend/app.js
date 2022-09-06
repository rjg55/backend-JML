const express = require("express");
const apiRouter = require(`${__dirname}/routes/api-routes.js`);
const app = express();

const {
  handleCustomErrors,
  handleValidationErrors,
} = require(`${__dirname}/errors/errors.js`);

// Routing & parsing
app.use(express.json());
app.use("/api", apiRouter);

//errors
app.use(handleCustomErrors);
app.use(handleValidationErrors);
app.all("*", (req, res) => {
  const msg = { msg: "Path does not exist" };
  res.status(404).send(msg);
});

module.exports = app;
