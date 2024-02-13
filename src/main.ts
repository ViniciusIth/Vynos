import data from "../config.json";
import path from "node:path";

import { readdir } from "node:fs/promises"
import { Client, Events, GatewayIntentBits, Collection } from "discord.js";
import log from "./utils/logger";
import type { CustomSlashCommand } from "./interfaces/command";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection()

const foldersPath = path.join(import.meta.dir, 'commands');
const commandsFolder = readdir(foldersPath, { recursive: true }).then((commands) => commands.filter((file) => file.endsWith('.ts')))

for (const file of await commandsFolder) {
    const filePath = path.join(foldersPath, file)
    const command = (await import(filePath)).default as CustomSlashCommand

    if (command) {
        log(command.data.name, console.log)
        client.commands.set(command.data.name, command)
    } else {
        log(`${file} isn't a command`, console.warn)
    }
}

client.once(Events.ClientReady, (client) => {
    log(`Ready! Logged in as ${client.user.tag}`, console.info)
})

client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    log(interaction, console.warn)

    const command = interaction.client.commands.get(interaction.commandName)

    if (!command) {
        log(`No command matching ${interaction.commandName}`, console.warn)
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        log(error, console.error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
        } else {
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
})

client.login(data.token)
