import { ICommandInteraction } from '../../interfaces/command';
import { CommandInteraction, SlashCommandBuilder } from 'discord.js';

const ping: ICommandInteraction = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with pong and latency!'),

  async execute(interaction: CommandInteraction): Promise<void> {
    const time = new Date().getTime() - interaction.createdAt.getTime();
    await interaction.reply(`Pong! ${time}ms`);
  },
};

export default ping;