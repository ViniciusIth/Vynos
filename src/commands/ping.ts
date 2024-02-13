import { SlashCommandBuilder, type CommandInteraction } from "discord.js";
import type { CustomSlashCommand } from "../interfaces/command";
import log from "../utils/logger";

const ping: CustomSlashCommand = {
    data: new SlashCommandBuilder().setName('ping').setDescription('Shows the latency of the bot'),
    execute: pingExecute
}

async function pingExecute(interaction: CommandInteraction) {
    log("pinged", console.info)
    await interaction.reply(`Pong! Interaction took ${interaction.client.ws.ping}ms!`)
}

export default ping;
