var express = require("express");
const router = express.Router();
const js = require("../client.json");
// const client = require("../index").client;

router.get("/", (req, res) => {
  res.send("cloud");
});

router.get("/bot", (req, res) => {
  const json = [
    {
      status: req.statusCode(200),
      endpoint: "/commands, /guilds",
    },
  ];
  res.json(json);
});

router.get("/bot/:id", (req, res) => {
  if (req.params.id == "commands") {
    res.json(js.bot[0].client.commands);
  } else if (req.params.id == "guilds") {
    res.json(js.bot[0].client.guilds);
  }
});

module.exports = router;
