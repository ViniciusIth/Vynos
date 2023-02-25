import { token, guildId, clientId } from './config.json';
import { REST, Routes } from 'discord.js';
import { commands } from './commands_list';
import chalk from 'chalk';

export async function RegisterCommands() {
  const rest = new REST({ version: '10' }).setToken(token);
  const commandData = commands.map((command) => command.data.toJSON());

  await rest
    .put(Routes.applicationGuildCommands(clientId, guildId), {
      body: commandData,
    })
    .then(() =>
      console.log(chalk.green(`Successfully registered the commands`))
    )
    .catch((error) =>
      console.log(chalk.red(`Couldn't register the commands: \n${error}`))
    );
}
