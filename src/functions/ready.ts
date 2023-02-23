import { token, guildId, clientId } from '../bot_config';
import { Client, REST, Routes } from 'discord.js';
import { commands } from '../commands/commands';

export async function onReady(client: Client) {
  const rest = new REST({ version: '10' }).setToken(token);

  const commandData = commands.map((command) => command.data.toJSON());

  await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
    body: commandData,
  });

  console.log('Discord ready!');
}
