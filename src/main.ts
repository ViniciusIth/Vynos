import { Client, Collection, Events, GatewayIntentBits } from 'discord.js';
import { connect, set } from 'mongoose';
import { token } from './bot_config';
import { commands } from './commands/commands';
import { onInteraction } from './functions/interaction';
import { onReady } from './functions/ready';

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

set('strictQuery', true);

connect('mongodb://localhost:27017/vynos', {}, (err) => {
  if (err)
    console.log(err);
  else
    console.log('mongdb is connected');
});

client.login(token);
