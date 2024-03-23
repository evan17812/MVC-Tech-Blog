const seedUsers = require("./user-seeds");
const seedBlogpost = require("./blogpost-seeds");

const sequelize = require("../config/connection");

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUsers();

  await seedBlogpost();

  process.exit(0);
};

seedAll();