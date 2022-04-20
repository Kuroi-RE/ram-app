const { Perms } = require("../validation/Permission")
const { Client }  = require("discord.js")


/**
 * @param {Client} client
 */

module.exports = async (client, PG, Ascii) => {
    const Table = new Ascii("Slash Commands Loaded")

    CommandsArray = [];
    
    (await PG(`${process.cwd()}/SlashCommands/*/*.js`)).map(async (file) => {
        const command = require(file)

        if(!command.name)
        return Table.addRow(file.split("/")[7], "❌ Failed", "Missing a name")
        if(!command.description)
        return Table.addRow(command.name, "❌ Failed", "Missing a description");
        if(!command.category)
        return Table.addRow(command.name, "❌ Failed", "Missing Category!");
        if(command.permission) {
            if(Perms.includes(command.permission))
            command.defaultPermission = false;
            else
            return Table.addRow(command.name, "❌ Failed", "Permission is invalid")
        }

        client.commands.set(command.name, command);
        CommandsArray.push(command)

        await Table.addRow(command.name, "✔️ SUCCESFUL")
    })

    console.log(Table.toString())

    // Perms cek
    client.on("ready", async () => {
        const MainGuild = await client.guilds.cache.get("744885612460507145");

        MainGuild.commands.set(CommandsArray).then(async (command) => {
            const Roles = (commandName) => {
                const cmdPerms = CommandsArray.find((c) => c.name === commandName).permission;
                if(!cmdPerms) return null;

                return MainGuild.roles.cache.filter((r) => r.permissions.has(cmdPerms));

            }

            const fullPermissions = command.reduce((accumulator, r) => {
                const roles = Roles(r.name);
                if(!roles) return accumulator;

                const permissions = roles.reduce((a, r) => {
                    return [...a, {id: r.id, type: "ROLE", permission: true}]
                }, [])

                return [...accumulator, {id: r.id, permissions}]
            }, [])

            await MainGuild.commands.permissions.set({ fullPermissions })
        })
    })
}