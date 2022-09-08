const Users = require(`${__dirname}/../schemas/user-schema.js`);

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
    allUsers = await Users.find({});
  } else {
    allUsers = await Users.find({}).sort([[sortBy, orderQuery]]);
  }
  return allUsers;
};

exports.fetchUserById = async (_id) => {
  const oneUser = await Users.findOne({ _id });
  return oneUser;
};

exports.insertUser = (user) => {
  return Users.create(user);
};

exports.removeUser = (_id) => {
  return Users.findByIdAndDelete(_id);
};

exports.updateUser = (_id, userInfo) => {
  return Users.findByIdAndUpdate(_id, { ...userInfo }, { new: true });
};
