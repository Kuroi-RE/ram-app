const express = require("express");
const cors = require("cors");
const path = require("path");
const secure = require("ssl-express-www");
const PORT = process.env.PORT || 4000;
const host = "0.0.0.0";

// Discord JS
const { Client, Collection, MessageEmbed } = require("discord.js");
const config = require("./bot/Structures/database/config.json");
const { promisify } = require("util");
const { glob } = require("glob");
const fs = require("fs");
const PG = promisify(glob);
const Ascii = require("ascii-table");
const db = require("quick.db");

const client = new Client({
  intents: [32767],
  allowedMentions: { repliedUser: false },
}); // new client

// ** Collection Discord * \\
client.commands = new Collection();
client.aliases = new Collection();
client.afk = new Collection();
//** Collection Discord */
client.categories = fs.readdirSync("./bot/commands/"); // for dynamic help

["Events", "SlashCommands", "Commands"].forEach((handler) => {
  require(`./bot/Structures/Handlers/${handler}`)(client, PG, Ascii); // easy import module
});

// const testSchema = require('../Schema/test');

//!! Event listener !!/
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (!message.guild) return;

  // DB
  let prefix = await db.fetch(`prefix_${message.guild.id}`);

  if (prefix == null) {
    prefix = config.prefix;
  } else {
    prefix = prefix;
  }

  // DB
  if (!message.content.startsWith(prefix)) return;

  if (!message.member)
    message.member = await message.guild.fetchMember(message);
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  if (cmd.length == 0) return;

  try {
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    if (command) command.run(client, message, args);
  } catch (Err) {
    let embed = new MessageEmbed({
      color: "AQUA",
      description: "Ditemukan error saat melakukan perintah.",
    });
    message.channel.send({ embeds: [embed] });
  }
});

//* MONGO !
const mongo = require("./bot/Structures/function/mongodb");
const ConnectToMongo = async () => {
  await mongo().then(async (mongoose) => {
    try {
      console.log("Connected to MongoDB");
    } finally {
      mongoose.connection.close();
    }
  });
};

// DJS

const jsson = {
  bot: [
    {
      client: {
        commands: client.commands,
        aliases: client.aliases,
        // user: {
        //   name: client.user.username,
        //   id: client.user.id,
        // },
        guild: {
          size: client.guilds.cache.size,
          list: client.guilds.cache.find((a) => a.name),
        },
      },
    },
  ],
};

fs.writeFileSync("client.json", JSON.stringify(jsson, null, 2));

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

app.use("/bot", (req, res) => {
  res.status(200);
  // res.send(
  //   "<h1 style='text-align: center; background-color: red;'>[404] Page not found.</h1>"
  // );

  var jsp = {
    user: client.user,
  };
  res.json(jsp);
});

ConnectToMongo();
client.login(config.token); // bot token

app.listen(PORT, host, () => {
  console.log("Server Running at port " + PORT);
});

// module.exports = {
//   app: app,
//   client: client,
// };

module.exports = app;
