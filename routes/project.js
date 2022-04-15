const e = require("express");
var express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("project/project");
});

router.get("/topup", (req, res) => {
  res.render("project/topup");
});

router.get("/topup/:game", (req, res) => {
  if (req.query.game == "ml") {
    res.render("project/ml");
  } else {
    res.render("project/topup");
  }
});

module.exports = router;
