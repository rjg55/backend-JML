const Groups = require(`${__dirname}/../schemas/group-schema.js`);
const fs = require("fs/promises");

exports.fetchAllGroups = async (
  sortby = "member_count",
  order = "asc",
  category
) => {
  const validSortby = [
    "title",
    "category",
    "description",
    "member_count",
    "admin",
    "thanks",
  ];

  const validOrder = ["asc", "desc"];

  const validCategories = [
    "outdoors",
    "sport",
    "nightlife",
    "leisure",
    "hobbies",
    "daytrips",
    "film",
    undefined,
  ];

  if (
    !validSortby.includes(sortby) ||
    !validOrder.includes(order) ||
    !validCategories.includes(category)
  ) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }

  let orderQuery = 1;
  if (order === "desc") {
    orderQuery = -1;
  }

  let groupData = "";

  if (!category) {
    groupData = await Groups.find({}).sort([[sortby, orderQuery]]);
  } else {
    groupData = await Groups.find({ category: category }).sort([
      [sortby, orderQuery],
    ]);
  }
  return groupData;
};

exports.fetchGroupById = async (group_id) => {
  const groupById = await Groups.find({ _id: group_id });

  if (groupById.length === 0) {
    return Promise.reject({
      status: 404,
      msg: "Not found",
    });
  }

  return groupById[0];
};

exports.addGroup = (title, category, description, admin) => {
  return Groups.create({
    title,
    category,
    description,
    admin,
  });
};
