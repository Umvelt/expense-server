const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
require('dotenv').config()
const Sequelize = require("sequelize");
const sequelize = require("./models/connectToDB");
const indexRouter = require("./routes/index");
const User = require("./models/User.models");
// const testConnection = require("./testConnection");


const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors({
    origin: "*"
}));
app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", indexRouter);

app.use("/hello", (req, res) =>
    res.send("hello world!")
);

app.use("/getAllUsers", async (req, res) => {
    try {
        const users = await User.findAll();
        if (!users) throw "no users in database!";
        res.status(200).json("ok");
    } catch (error) {
        console.log(error);
    }
});

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

module.exports = app;
