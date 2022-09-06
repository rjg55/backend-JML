const Users = require(`${__dirname}/../schemas/user-schema.js`);
const fs = require("fs/promises");

exports.fetchAllUsers = async () => {
  const allUsers = await Users.find({});
  return allUsers;
};
