import { CommandInteraction, SlashCommandBuilder } from 'discord.js';
import { ICommandInteraction } from '../../interfaces/command';
import { Character } from '../../schemas/character';

const getCharacter: ICommandInteraction = {
  data: new SlashCommandBuilder()
    .setName('get_character')
    .setDescription('get the character by id')
    .addStringOption((option) =>
      option
        .setName('character_id')
        .setDescription('The chosen character')
        .setRequired(true)
    ),
  async execute(interaction: CommandInteraction): Promise<void> {
    const characterId = interaction.options.get('character_id')?.value;

    const character = await Character.findById(characterId).exec();

    interaction.reply(`Data for ${character?.name} is WIP`);
  },
};

export default getCharacter