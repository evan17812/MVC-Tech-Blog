const { User } = require("../models");

const userData = [
  {
    username: "Evan",
    password: "123123",
  },
  {
    username: "Bob",
    password: "123123",
  },
];

const seedUsers = () =>
  User.bulkCreate(userData, { individualHooks: true, returning: true });

module.exports = seedUsers;