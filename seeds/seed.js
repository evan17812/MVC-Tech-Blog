const seedUsers = require("./user-seeds");
const seedBlogposts = require("./blogpost-seeds");

const sequelize = require("../config/connection");

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log("\n----- DATABASE SYNCED -----\n");
  await seedUsers();
  console.log("\n----- Users SEEDED -----\n");

  await seedBlogposts();
  console.log("\n----- Blogposts SEEDED -----\n");

  process.exit(0);
};

seedAll();