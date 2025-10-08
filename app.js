const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
const connectMongodb = require("./init/mongodb");
const { authRoute } = require("./route");

// init app
const app = express();

//connect database
connectMongodb();

// third-party middleware
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "500mb", extended: true }));

//route section

app.use("./api/v1/auth", authRoute);

module.exports = app;
