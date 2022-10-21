var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongo = require("mongoose");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const stuffsRouter = require("./routes/stuffs");
const loansRouter = require("./routes/loans")

var environment = process.env.NODE_ENV
const port =  environment === 'development' ? process.env.PORT_DEV : process.env.PORT_PROD;

require("dotenv").config();

var app = express();
mongo.connect(process.env.MONGODB_LINK, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/stuffs", stuffsRouter);
app.use("/loans", loansRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
app.listen(port, () => {
  console.log(`Server runs on ${port}`);
});
module.exports = app;
