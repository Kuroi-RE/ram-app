const express = require("express");
const cors = require("cors");
const secure = require("ssl-express-www");
const PORT = process.env.PORT || 4000;
const host = "0.0.0.0";

const route = require("./routes/routes");
const project = require("./routes/project");
const api = require("./routes/api");

var app = express();
app.enable("trust proxy");
app.set("json spaces", 2);
app.set("view engine", "ejs");
app.use(cors());
app.use(secure);
// app.use(express.static(__dirname + "/public"));

// bootstrap
// app.use(
//   "/css",
//   express.static(path.join(__dirname, "node_modules/bootstrap/dist/css"))
// );
// app.use(
//   "/js",
//   express.static(path.join(__dirname, "node_modules/bootstrap/dist/js"))
// );
// app.use(
//   "/js",
//   express.static(path.join(__dirname, "node_modules/jquery/dist"))
// );

// public init
app.use("*/css", express.static("public/css"));
app.use("*/js", express.static("public/js"));
app.use("*/img", express.static("public/img"));

// routes
app.use("/", route);
app.use("/project", project);
app.use("/api", api);

app.listen(4000, host, () => {
  console.log("Server Running at port " + PORT);
});

module.exports = app;
