const {
  fetchAllGroups,
  fetchGroupById,
  addGroup,
  updateGroupByID,
} = require(`${__dirname}/../models/group-models.js`);

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

exports.postGroup = (req, res, next) => {
  const { title, category, description, admin } = req.body;
  addGroup(title, category, description, admin)
    .then((newGroup) => {
      res.status(201).send({ newGroup });
    })
    .catch((err) => {
      let allErrors = Object.keys(err.errors);
      let firstError = allErrors[0];
      next(err.errors[firstError].properties);
    });
};

exports.patchGroupByID = (req, res, next) => {
  const { group_id } = req.params;
  const updatedGroupInfo = req.body;
  updateGroupByID(group_id, updatedGroupInfo)
    .then((updatedGroup) => {
      res.status(200).send({ group: updatedGroup });
    })
    .catch((err) => {
      if (err.errors) {
        let allErrors = Object.keys(err.errors);
        let firstError = allErrors[0];
        next(err.errors[firstError].properties);
      } else {
        next(err);
      }
    });
};
