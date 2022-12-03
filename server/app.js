var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongo = require("mongoose");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const stuffsRouter = require("./routes/stuffs");
const loansRouter = require("./routes/loans");
const studentsRouter = require("./routes/students");
const cors = require("cors");
var environment = process.env.NODE_ENV;
const port =
  environment === "development" ? process.env.PORT_DEV : process.env.PORT_PROD;

require("dotenv").config();

var app = express();
mongo.connect(process.env.MONGODB_LINK, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", indexRouter);
app.use("/api/students", studentsRouter);
app.use("/api/users", usersRouter);
app.use("/api/stuffs", stuffsRouter);
app.use("/api/loans", loansRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  app.set("view engine", "json");
  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});
app.listen(port,'127.0.0.1', () => {
  console.log(`Server runs on ${port}`);
});
module.exports = app;
