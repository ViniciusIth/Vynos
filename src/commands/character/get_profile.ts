import {
  CommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from 'discord.js';
import buildProfile from '../../embeds/character_profile';
import { ICommandInteraction } from '../../interfaces/command';
import { Character } from '../../schemas/character';

const getCharacter: ICommandInteraction = {
  data: new SlashCommandBuilder()
    .setName('get_profile')
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

    if (!character) {
      return;
    }

    const profileEmbed = buildProfile(character);

    interaction.reply({ embeds: [profileEmbed] });
  },
};

export default getCharacter;
