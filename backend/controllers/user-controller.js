const { fetchAllUsers } = require(`${__dirname}/../models/user-models.js`);

exports.getAllUsers = (req, res, next) => {
  fetchAllUsers()
    .then(() => {})
    .catch(next);
};
