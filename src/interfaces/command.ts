import type { CommandInteraction, SlashCommandBuilder } from "discord.js";

export interface CustomSlashCommand {
    data: SlashCommandBuilder,
    execute: (interaction: CommandInteraction) => Promise<void>
}
