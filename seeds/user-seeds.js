const { User } = require("../models");

const userData = [
  {
    username: "saliniwth",
    password: "password12345",
  },
  {
    username: "lernantino",
    password: "password12345",
  },
];

const seedUsers = () =>
  User.bulkCreate(userData, { individualHooks: true, returning: true });

module.exports = seedUsers;