import {
  Client,
  Collection,
  Events,
  GatewayIntentBits,
  InteractionType,
} from 'discord.js';
import { connect, set } from 'mongoose';
import { token } from './config.json';
import { commands } from './commands_list';
import { RegisterCommands } from './register_commands';
import { ICommandModalInteraction } from './interfaces/command';
import chalk from 'chalk';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

console.log('\nRegistering commands -> [');
for (const command of commands) {
  console.log(`   ${command.data.name}`);
  client.commands.set(command.data.name, command);
}
console.log(']\n');

client.once(Events.ClientReady, async (c) => {
  await RegisterCommands();

  console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  // Executes the 'execute' method of all commands
  if (interaction.isCommand())
    for (const command of commands) {
      if (interaction.commandName === command.data.name) {
        await command.execute(interaction);
        break;
      }
    }

  // Executes the 'handle' method of all commands with modals
  if (interaction.type === InteractionType.ModalSubmit)
    for (const modalCommand of commands as ICommandModalInteraction[]) {
      if (interaction.customId === modalCommand.data.name) {
        await modalCommand.handle(interaction);
      }
    }
});

// Database options
set('strictQuery', true);
connect('mongodb://localhost:27017/vynos', {}, (err) => {
  if (err) console.log(err);
  else console.log(chalk.green('mongdb is connected'));
});

client.login(token);
