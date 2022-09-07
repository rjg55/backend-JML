const { fetchAllGroups } = require(`${__dirname}/../models/group-models.js`);

exports.getAllGroups = (req, res, next) => {
  const { sortby, order } = req.query;
  fetchAllGroups(sortby, order)
    .then((groups) => {
      res.status(200).send({ groups: groups });
    })
    .catch(next);
};
