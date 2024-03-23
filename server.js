const express = require("express");
const session = require("express-session");
const routes = require("./controllers");
const exphbs = require("express-handlebars");
const helpers = require("./utils/helpers");
const path = require("path");

const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;
const hbs = exphbs.create({ helpers });

app.set("trust proxy", 1); // Enable trust proxy to read X-Forwarded-Proto header
const sess = {
  secret: process.env.SESSION_SECRET || "SuperSecretSessionSecret", // Use a secure secret
  cookie: {
    maxAge: 86400000, // 24 hours in milliseconds
    secure: process.env.NODE_ENV === "production", // Set to true in production if using HTTPS
    httpOnly: false,
    sameSite: "none",
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});