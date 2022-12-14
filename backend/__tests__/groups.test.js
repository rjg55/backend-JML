const app = require(`${__dirname}/../app.js`);
const mongoose = require("mongoose");
const { seedDB } = require(`${__dirname}/../seed.js`);
const dotenv = require("dotenv");
const request = require("supertest");
const Groups = require(`../schemas/group-schema`);

dotenv.config({
  path: `${__dirname}/../.env.test`,
});

beforeAll(async () => {
  connection = await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Connected, seeding.");
    })
    .catch((err) => {
      console.log(err);
    });
});

beforeEach(() => {
  return seedDB();
});
afterAll(() => {
  mongoose.connection.close();
});

// test("return something", () => {});

describe("GET", () => {
  describe("status 200: returns all groups", () => {
    test("returns an array of all group objects", () => {
      return request(app)
        .get("/api/groups")
        .expect(200)
        .then(({ body }) => {
          expect(Array.isArray(body.groups)).toBe(true);
          expect(body.groups.length).toBeGreaterThan(0);
          body.groups.forEach((group) => {
            expect(group).toEqual(
              expect.objectContaining({
                _id: expect.any(String),
                title: expect.any(String),
                category: expect.any(String),
                description: expect.any(String),
                members: expect.anything(),
                admin: expect.any(String),
                thanks: expect.any(Number),
              })
            );
          });
        });
    });
  });
  describe("Queries", () => {
    describe("SORTBY", () => {
      test("return an array of groups sorted by title - a-z", () => {
        return request(app)
          .get("/api/groups?sortby=title")
          .expect(200)
          .then(({ body }) => {
            expect(body.groups).toBeSortedBy("title");
          });
      });
      test("return an array of groups sorted by category - a-z", () => {
        return request(app)
          .get("/api/groups?sortby=category")
          .expect(200)
          .then(({ body }) => {
            expect(body.groups).toBeSortedBy("category");
          });
      });
      test("return an array of groups sorted by description - a-z", () => {
        return request(app)
          .get("/api/groups?sortby=description")
          .expect(200)
          .then(({ body }) => {
            expect(body.groups).toBeSortedBy("description");
          });
      });
      test("return an array of groups sorted by no. of members", () => {
        return request(app)
          .get("/api/groups?sortby=member_count")
          .expect(200)
          .then(({ body }) => {
            expect(body.groups).toBeSortedBy("member_count");
          });
      });
      test("return an array of groups sorted by admin - a-z", () => {
        return request(app)
          .get("/api/groups?sortby=admin")
          .expect(200)
          .then(({ body }) => {
            expect(body.groups).toBeSortedBy("admin");
          });
      });
      test("return an array of groups sorted by thanks - a-z", () => {
        return request(app)
          .get("/api/groups?sortby=thanks")
          .expect(200)
          .then(({ body }) => {
            expect(body.groups).toBeSortedBy("thanks");
          });
      });
    });
    test("return an array of only those groups with a category of outdoors", () => {
      return request(app)
        .get("/api/groups?category=outdoors")
        .expect(200)
        .then(({ body: { groups } }) => {
          groups.forEach((group) => {
            expect(group.category).toBe("outdoors");
          });
        });
    });
  });
  describe("SORTBY - error handling", () => {
    test("status 400 - bad request - column does not exist", () => {
      return request(app)
        .get("/api/groups?sortby=battenberg")
        .expect(400)
        .then(({ body }) => {
          expect(body).toEqual({ msg: "Bad request" });
        });
    });

    describe("ORDER", () => {
      test("should return groups sorted in descending order (sort_by set to default)", () => {
        return request(app)
          .get("/api/groups?order=desc")
          .expect(200)
          .then(({ body }) => {
            expect(body.groups).toBeSortedBy("member_count", {
              descending: true,
            });
          });
      });
      test("should return groups sorted by member_count in descending order", () => {
        return request(app)
          .get("/api/groups?sortby=member_count&order=desc")
          .expect(200)
          .then(({ body }) => {
            expect(body.groups).toBeSortedBy("member_count", {
              descending: true,
            });
          });
      });
    });
    describe("ORDER - error handling", () => {
      test("status 400 - bad request - invalid order query", () => {
        return request(app)
          .get("/api/groups?sortby=member_count&order=decreasing")
          .expect(400)
          .then(({ body }) => {
            expect(body).toEqual({ msg: "Bad request" });
          });
      });
    });
  });
});

describe("/api/groups/:id", () => {
  describe("GET", () => {
    test("status 200: returns a group object with a specific ID", async () => {
      const allGroups = await Groups.find({});
      const firstGroupId = allGroups[0]._id;

      return request(app)
        .get(`/api/groups/${firstGroupId}`)
        .expect(200)
        .then(({ body }) => {
          expect(body.group._id).toEqual(String(firstGroupId));
        });
    });
    test("status 200: returns a group object with a specific ID and correct properties", async () => {
      const allGroups = await Groups.find({});
      const firstGroupId = String(allGroups[0]._id);

      return request(app)
        .get(`/api/groups/${firstGroupId}`)
        .expect(200)
        .then(({ body: { group } }) => {
          expect(group).toEqual(
            expect.objectContaining({
              _id: expect.any(String),
              title: expect.any(String),
              category: expect.any(String),
              description: expect.any(String),
              members: expect.anything(),
              member_count: expect.any(Number),
              admin: expect.any(String),
              thanks: expect.any(Number),
            })
          );
        });
    });
  });
  test("Returns a status of 404 when given an ID which does not exist", () => {
    return request(app)
      .get(`/api/groups/123456789012345678901234`)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not found");
      });
  });
  test("Returns a status of 400 when given an invalid ID", () => {
    return request(app)
      .get(`/api/groups/123456`)
      .expect(400)
      .then(({ text }) => {
        expect(text).toBe(
          'Cast to ObjectId failed for value "123456" (type string) at path "_id" for model "Group"'
        );
      });
  });
});

describe(" POST /api/groups", () => {
  test("Returns a status of 201 and newly added group object", () => {
    const addGroup = {
      title: "Cow Lovers",
      category: "leisure",
      description: "We love cows and tipping them",
      admin: "Cowpoke123",
    };
    return request(app)
      .post("/api/groups")
      .send(addGroup)
      .expect(201)
      .then(({ body: { newGroup } }) => {
        expect(newGroup).toEqual(
          expect.objectContaining({
            _id: expect.any(String),
            title: expect.any(String),
            category: expect.any(String),
            description: expect.any(String),
            members: expect.anything(),
            member_count: expect.any(Number),
            admin: expect.any(String),
            thanks: expect.any(Number),
          })
        );
      });
  });
  test("Returns a status 400 when given a malformed body/missing fields/incorrect type", () => {
    const addGroup = {
      category: "leisure",
      description: "We love cows and tipping them",
      admin: "Cowpoke123",
    };
    return request(app)
      .post("/api/groups")
      .send(addGroup)
      .expect(400)
      .then(({ text }) => {
        expect(text).toBe("Path `title` is required.");
      });
  });
});

describe("PATCH /api/groups", () => {
  test("status 200: update group title with specific ID", async () => {
    const allGroups = await Groups.find({});
    const firstGroupId = String(allGroups[0]._id);

    const updatedTitle = { title: "This is a new title" };

    return request(app)
      .patch(`/api/groups/${firstGroupId}`)
      .send(updatedTitle)
      .expect(200)
      .then(({ body: { group } }) => {
        expect(group.title).toEqual("This is a new title");
        expect(group._id).toEqual(firstGroupId);
      });
  });
  test("status 200: update another field in a group (description) with specific ID", async () => {
    const allGroups = await Groups.find({});
    const firstGroupId = String(allGroups[0]._id);

    const updatedField = { description: "This is a new desc" };

    return request(app)
      .patch(`/api/groups/${firstGroupId}`)
      .send(updatedField)
      .expect(200)
      .then(({ body: { group } }) => {
        expect(group.description).toEqual("This is a new desc");
        expect(group._id).toEqual(firstGroupId);
      });
  });
  describe("PATCH - error handling", () => {
    test("status 404 - not found - group_id does not exist", () => {
      const updatedTitle = { title: "This is a new title" };

      return request(app)
        .patch(`/api/groups/123456789123456789123456`)
        .send(updatedTitle)
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toEqual("Not found");
        });
    });
    test("status 400 - bad request - invalid id", async () => {
      const updatedTitle = { title: undefined };

      return request(app)
        .patch(`/api/groups/13`)
        .send(updatedTitle)
        .expect(400)
        .then((body) => {
          expect(body.error.text).toEqual(
            'Cast to ObjectId failed for value "13" (type string) at path "_id" for model "Group"'
          );
        });
    });
  });
});

describe("DELETE /api/groups/:group_id", () => {
  test("returns a status of 204 and no content", async () => {
    const allGroups = await Groups.find({});
    const firstGroupId = String(allGroups[0]._id);

    return request(app).delete(`/api/groups/${firstGroupId}`).expect(204);
  });
  test("returns a status of 404 if group does not exist", async () => {
    return request(app)
      .delete(`/api/groups/123456789012345678901234`)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toEqual("Not found");
      });
  });
  test("status 400 - bad request - invalid id", async () => {
    return request(app)
      .delete(`/api/groups/13`)
      .expect(400)
      .then((body) => {
        expect(body.error.text).toEqual(
          `Cast to ObjectId failed for value \"{ _id: '13' }\" (type Object) at path \"_id\" for model \"Group\"`
        );
      });
  });
});
