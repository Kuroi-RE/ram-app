const express = require("express");
const cors = require("cors");
const path = require("path");
const secure = require("ssl-express-www");

const route = require("./routes/routes");

var app = express();
app.enable("trust proxy");
app.set("json spaces", 2);
app.use(cors());
app.use(secure);
// app.use(express.static(__dirname + "/public"));

app.use("*/css", express.static("public/css"));
app.use("*/js", express.static("public/js"));
app.use("*/img", express.static("public/img"));

app.use("/", route);

app.listen("5500", () => {
  console.log("Server Running.");
});

module.exports = app;
