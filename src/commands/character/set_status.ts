import { CommandInteraction, SlashCommandBuilder } from 'discord.js';
import { ICommandInteraction } from '../../interfaces/command';

const setStatus: ICommandInteraction = {
  data: new SlashCommandBuilder()
    .setName('set_status')
    .setDescription('allows for status definition')
    .addStringOption((option) =>
      option
        .setName('status')
        .setDescription('The status to change')
        .setRequired(true)
        .addChoices(
          { name: 'LVL', value: 'level' },
          { name: 'HP', value: 'health' },
          { name: 'PE', value: 'eter' }
        )
    )
    .addIntegerOption((option) =>
      option
        .setName('value')
        .setDescription('The new value for the status')
        .setRequired(true)
    ),

  async execute(interaction: CommandInteraction): Promise<void> {
    const time = new Date().getTime() - interaction.createdAt.getTime();
    await interaction.reply(`Pong! ${time}ms`);
  },
};

export default setStatus;
