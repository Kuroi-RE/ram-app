__path = process.cwd();
// var data = require("../public/js/sosial");

var express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("home/home");
});

router.get("/games", (req, res) => {
  res.render("home/games");
});

router.get("/sosial", (req, res) => {
  res.render("home/sosial");
});

// router.get("/api/message", (req, res) => {
//   const msg = data();

//   res.json(msg);
// });

module.exports = router;
