const e = require("express");
var express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const json = [
    {
      message: "200OK",
    },
  ];
  res.json(json);
});

module.exports = router;
