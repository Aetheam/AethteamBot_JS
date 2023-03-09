const {Events, ChatInputCommandInteraction} = require("discord.js");
const {interactionCommands} = require("./../index");
module.exports = {
    name: Events.InteractionCreate,
    once: false,
    async run(interaction, client) {
        let command;
        if (interaction.isChatInputCommand()) {
            if ((command = interactionCommands.get(interaction.commandName))) {
                await command.execute(interaction, client)
            }
        }
    }
}