const { fetchAllUsers } = require(`${__dirname}/../models/user-models.js`);

exports.getAllUsers = (req, res, next) => {
  const { sort_by: sortBy } = req.query;
  const { order } = req.query;

  fetchAllUsers(sortBy, order)
    .then((allUsers) => {
      res.status(200).send({ users: allUsers });
    })
    .catch(next);
};
