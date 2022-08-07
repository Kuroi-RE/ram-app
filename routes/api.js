var express = require("express");
const router = express.Router();
// const client = require("../index").client;

router.get("/", (req, res) => {
  res.send("cloud");
});

router.get("/data/:id/:apiKey", (req, res) => {
  if (req.params.id == "index") {
    if (req.params.apiKey == "lyna291727") {
      // document.getElementById("apiKey").innerHTML = "lyna291727";
      res.render("api/index");
    } else {
      // document.getElementById("errHiden").style = "display: content";
      // document.getElementById("container").style = "display: none";
      res.render("api/index");
    }
  } else {
    res.send("Not found");
  }
  res.send("/index/YourApiKey/");
});

// router.get("/bot/:id", (req, res) => {
//   if (req.params.id == "commands") {
//     res.json(js.bot[0].client.commands);
//   } else if (req.params.id == "guilds") {
//     res.json(js.bot[0].client.guilds);
//   }
// });

module.exports = router;
