__path = process.cwd();
// var data = require("../public/js/sosial");

var express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.sendFile(__path + "/views/home.html");
});

router.get("/games", (req, res) => {
  res.sendFile(__path + "/views/games.html");
});

router.get("/sosial", (req, res) => {
  res.sendFile(__path + "/views/sosial.html");
});

// router.get("/api/message", (req, res) => {
//   const msg = data();

//   res.json(msg);
// });

module.exports = router;
