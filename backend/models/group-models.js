const Groups = require(`${__dirname}/../schemas/group-schema.js`);
const fs = require("fs/promises");

exports.fetchAllGroups = async (sortby = "members") => {
  const validSortby = [
    "title",
    "category",
    "description",
    "members",
    "admin",
    "thanks",
  ];

  if (validSortby.includes(sortby)) {
    const groupData = await Groups.find({}).sort(sortby);
    return groupData;
  } else {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }
};
