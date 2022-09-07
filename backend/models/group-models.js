const Groups = require(`${__dirname}/../schemas/group-schema.js`);
const fs = require("fs/promises");

exports.fetchAllGroups = async (sortby = "member_count", order = "asc") => {
  const validSortby = [
    "title",
    "category",
    "description",
    "member_count",
    "admin",
    "thanks",
  ];

  const validOrder = ["asc", "desc"];

  if (validSortby.includes(sortby) && validOrder.includes(order)) {
    let orderQuery = 1;
    if (order === "desc") {
      orderQuery = -1;
    }
    const groupData = await Groups.find({}).sort([[sortby, orderQuery]]);
    return groupData;
  } else {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }
};
