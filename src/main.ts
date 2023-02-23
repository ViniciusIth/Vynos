import { Client, Collection, Events, GatewayIntentBits } from 'discord.js';
import { token } from './bot_config';
import { commands } from './commands/commands';
import { onInteraction } from './interaction';
import { onReady } from './ready';

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
  presence: { status: 'dnd' },
});

client.commands = new Collection();

console.log('\nRegistering commands -> [');
for (const command of commands) {
  console.log(`   ${command.data.name}`);
  client.commands.set(command.data.name, command);
}
console.log(']\n');

client.once(Events.ClientReady, async (client) => {
  await onReady(client);
  console.log('Client ready!');
  console.log(`Logged in as ${client.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  await onInteraction(interaction);
});

client.login(token);
