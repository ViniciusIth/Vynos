import { ICommandInteraction } from '../../interfaces/command';
import { CommandInteraction, SlashCommandBuilder } from 'discord.js';

const ping: ICommandInteraction = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with pong and latency!'),

  async execute(interaction: CommandInteraction): Promise<void> {
    await interaction.reply(`Pong! ${interaction.client.ws.ping}ms`);
  },
};

export default ping;
