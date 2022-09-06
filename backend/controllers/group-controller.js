const { fetchAllGroups } = require(`${__dirname}/../models/group-models.js`);

exports.getAllGroups = (req, res, next) => {
  fetchAllGroups()
    .then(() => {})
    .catch(next);
};
