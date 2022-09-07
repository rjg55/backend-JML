const { fetchGroupById } = require("../models/group-models");

const { fetchAllGroups } = require(`${__dirname}/../models/group-models.js`);

exports.getAllGroups = (req, res, next) => {
  const { sortby, order, category } = req.query;
  fetchAllGroups(sortby, order, category)
    .then((groups) => {
      res.status(200).send({ groups: groups });
    })
    .catch(next);
};

exports.getGroupById = (req, res, next) => {
  const { group_id } = req.params;
  fetchGroupById(group_id)
    .then((group) => {
      res.status(200).send({ group: group });
    })
    .catch(next);
};
