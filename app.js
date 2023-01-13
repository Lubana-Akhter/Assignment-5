//Basic Library import
const express = require("express");
const router = require("./src/routes/api");
const app = new express();
const bodyParser = require("body-parser");

//secuirity Library middleware
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");

//Database Lib Import
const mongoose = require("mongoose");

//secuirity Library middleware implement
app.use(cors())
app.use(helmet())
app.use(mongoSanitize())
app.use(xss())
app.use(hpp())

//Body parse implement
app.use(bodyParser.json())

//Request Rate limit
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 3000 })
app.use(limiter)

//Mongodb Database connection
let URI = "mongodb://127.0.0.1:27017/Todo";
let OPTION = { user: "", pass: ""}
mongoose.connect(URI, OPTION, (err) => {
    console.log(" Database connection success");
    console.log(err);

})

// Routing Implement
app.use("/api/v1", router);

//undefined route implement
app.use("*", (req, res) => {
    res.status(400).json({ status: "Failed", data: "Not found" })
})

module.exports = app;
