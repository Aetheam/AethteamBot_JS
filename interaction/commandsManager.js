const fs = require('node:fs');
const path = require('node:path');
const {REST, Routes} = require("discord.js")
const interactionPath = path.join(__dirname, "commands");
const {interactionCommands} = require("./../index");
const interactionFiles = fs.readdirSync(interactionPath).filter(file => file.endsWith(".js"));
const slash = [];
for (const interactionFile of interactionFiles) {
    const interaction = require(interactionPath + "/" + interactionFile);
    interactionCommands.set(interaction.data.name, interaction);
    slash.push(interaction.data.toJSON())
}
    const restMethods = new REST({version: 10}).setToken(process.env.TOKEN);
    try {
        console.log(`Mise à jour de ${slash.length} commandes`);
        restMethods.put(Routes.applicationCommands(process.env.CLIENT_ID), {body: slash}).then(() => {
            console.log(`Mise à jour terminée`);
        })

    } catch (error) {
        console.log(error)
    }

