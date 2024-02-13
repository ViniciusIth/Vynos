import { REST, Routes } from 'discord.js';
import { clientId, guildId, token } from '../config.json';
import { readdir } from "node:fs/promises"
import path from "node:path";
import type { CustomSlashCommand } from "./interfaces/command";
import log from './utils/logger';

export async function reloadTestCommands() {
    const commands = [];

    // Grab all the command folders from the commands directory you created earlier
    const foldersPath = path.join(__dirname, 'commands');
    const commandsFolder = readdir(foldersPath, { recursive: true }).then((commands) => commands.filter((file) => file.endsWith('.ts')))

    for (const file of await commandsFolder) {
        const filePath = path.join(foldersPath, file)
        const command = (await import(filePath)).default as CustomSlashCommand

        if (command) {
            log(command.data.name, console.log)
            commands.push(command.data.toJSON())
        } else {
            log(`${file} isn't a command`, console.warn)
        }
    }

    // Construct and prepare an instance of the REST module
    const rest = new REST().setToken(token);

    // and deploy your commands!
    try {
        log(`Started refreshing ${commands.length} application (/) commands.`, console.info);

        // The put method is used to fully refresh all commands in the guild with the current set
        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands },
        );

        log(`Successfully reloaded ${commands.length} application (/) commands.`, console.info);
    } catch (error) {
        // And of course, make sure you catch and log any errors!
        console.error(error);
    }
}

if (import.meta.main) {
    reloadTestCommands()
}
