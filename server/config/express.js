const express = require("express");
const path = require("path");
const config = require("./config");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const routes = require("../routes");
const passport = require("../middleware/passport");
const compress = require("compression");
const httpError = require('http-errors');

// get app
const app = express();

// logger
if (config.env === "development") {
  app.use(logger("dev"));
}

// get dist folder
const distDir = path.join(__dirname, "../../dist");

// use dist flder as hosting folder by express
app.use(express.static(distDir));

// parsing from api
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// secure apps http
app.use(helmet());

// allow cors
app.use(cors());

// authenticate
app.use(passport.initialize());

// compression
app.use(compress());

// api router localhost:4050/api
app.use("/api/", routes);

// serve the index.html
app.get("*", (req, res) => res.sendFile(path.join(distDir, "index.html")));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new httpError(404)
  return next(err);
});

// error handler, send stacktrace 
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message
  });
  next(err);
});

module.exports = app;
