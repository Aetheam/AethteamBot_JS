const {Client, GatewayIntentBits, Collection, Events} = require('discord.js');

const fs = require("node:fs");
const path = require("node:path");
require("dotenv").config();
const interactionCommands = new Collection()
module.exports.interactionCommands = interactionCommands
require("./interaction/commandsManager");
const client = new Client({
    intents: [GatewayIntentBits.Guilds]
})
registerEvents();
function registerEvents(){
    const eventFiles = fs.readdirSync(path.join(__dirname, "events"));
    for (const eventFile of eventFiles){
        const event = require(path.join(__dirname, "events", eventFile));
        if (event.once){
            client.once(event.name,(...arguments) => {event.run(...arguments)})
        }else {
            client.on(event.name,(...arguments) => {event.run(...arguments,client)})
        }
    }
}
client.login(process.env.TOKEN).then(r => console.log("Connection établie"));