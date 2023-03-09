const {SlashCommandBuilder} = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("ping la lantence du bot"),
    async execute(interaction, client) {
        await interaction.deferReply()
        const reply = await interaction.fetchReply();
        const ping = reply.createdTimestamp - interaction.createdTimestamp;
        await interaction.editReply(`🏓la latence est de: ${ping}ms.\n\n🏓l'api à une latence de: ${Math.round(client.ws.ping)}ms`)
    }
}