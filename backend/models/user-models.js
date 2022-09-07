const User = require(`${__dirname}/../schemas/user-schema.js`);
const fs = require("fs/promises");
const { all } = require("../routes/user-routes");

exports.fetchAllUsers = async (sortBy = "username", order = "desc") => {
  const validSortBys = ["username"];

  const validOrders = ["asc", "desc"];

  if (!validSortBys.includes(sortBy) || !validOrders.includes(order)) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }

  let orderQuery = -1;
  if (order !== "desc") {
    orderQuery = 1;
  }

  let allUsers = "";

  if (sortBy === undefined) {
    allUsers = await User.find({});
  } else {
    allUsers = await User.find({}).sort([[sortBy, orderQuery]]);
  }
  return allUsers;
};
