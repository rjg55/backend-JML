const express = require('express');
const app = express();

// Routing & parsing
app.use(express.json());

module.exports = app;
