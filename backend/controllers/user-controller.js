const {
  fetchAllUsers,
  fetchUserById,
  insertUser,
  removeUser,
  updateUser,
} = require(`${__dirname}/../models/user-models.js`);

exports.getAllUsers = (req, res, next) => {
  const { sort_by: sortBy } = req.query;
  const { order } = req.query;

  fetchAllUsers(sortBy, order)
    .then((allUsers) => {
      res.status(200).send({ users: allUsers });
    })
    .catch(next);
};

exports.getUserById = (req, res, next) => {
  fetchUserById(req.params._id)
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch((err) => {
      let allErrors = Object.keys(err.errors);
      let firstError = allErrors[0];
      next(err.errors[firstError].properties);
    });
};

exports.postUser = (req, res, next) => {
  const newUser = req.body;
  insertUser(newUser)
    .then((createdUser) => {
      res.status(201).send({ user: createdUser });
    })
    .catch((err) => {
      let allErrors = Object.keys(err.errors);
      let firstError = allErrors[0];
      next(err.errors[firstError].properties);
    });
};

exports.deleteUser = (req, res, next) => {
  fetchUserById(req.params._id)
    .then((checkedUser) => {
      removeUser(checkedUser._id).then(() => {
        res.status(204).send();
      });
    })
    .catch((err) => {
      let allErrors = Object.keys(err.errors);
      let firstError = allErrors[0];
      next(err.errors[firstError].properties);
    });
};

exports.patchUser = (req, res, next) => {
  const { _id } = req.params;
  updateUser(_id, req.body)
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch((err) => {
      let allErrors = Object.keys(err.errors);
      let firstError = allErrors[0];
      next(err.errors[firstError].properties);
    });
};
