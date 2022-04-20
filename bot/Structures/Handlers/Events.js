const { Events } = require("../validation/EventNames")
const { promisify } = require("util")



module.exports = async (client, PG, Ascii) => {
    const table = new Ascii("Event Loaded");

    (await PG(`${process.cwd()}/Events/*/*.js`)).map(async (file) => {
        const event = require(file)

        if(!Events.includes(event.name) || !event.name) {
            const L = file.split("/");
            await table.addRow(`${event.name || "❌ MISSING"}`, `Event name is either invalid or missing: ${L[7] + '/' + L[8]}`)
            return;
        }

        if(event.once){
            client.once(event.name, (...args) => event.execute(...args, client))
        } else {
            client.on(event.name, (...args) => event.execute(...args, client))
        }

        await table.addRow(event.name, "✔️ SUCCESFUL")
    })

    console.log(table.toString())
}