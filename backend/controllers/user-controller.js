const { fetchAllUsers } = require(`${__dirname}/../models/user-models.js`);

exports.getAllUsers = (req, res, next) => {
  fetchAllUsers()
    .then((allUsers) => {
      res.status(200).send({ users: allUsers });
    })
    .catch(next);
};
