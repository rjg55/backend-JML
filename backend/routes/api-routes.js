const apiRouter = require("express").Router();
const eventRouter = require(`${__dirname}/event-routes.js`);
const eventMessageRouter = require(`${__dirname}/event-message-routes.js`);
const groupRouter = require(`${__dirname}/group-routes.js`);
const userRouter = require(`${__dirname}/user-routes.js`);

apiRouter.use("/events", eventRouter);
apiRouter.use("/event-messages", eventMessageRouter);
apiRouter.use("/groups", groupRouter);
apiRouter.use("/users", userRouter);

module.exports = apiRouter;
