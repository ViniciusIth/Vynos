import {
  CommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from 'discord.js';
import buildProfile from '../../embeds/character_profile';
import { ICommandInteraction } from '../../interfaces/command';
import { Character } from '../../schemas/character';

const getProfile: ICommandInteraction = {
  data: new SlashCommandBuilder()
    .setName('get_profile')
    .setDescription('get the character by id')
    .addStringOption((option) =>
      option.setName('character_id').setDescription('The chosen character')
    ),
  async execute(interaction: CommandInteraction): Promise<void> {
    const characterId = interaction.options.get('character_id')?.value;
    let character = null;

    if (characterId) {
      character = await Character.findById(characterId).exec();
    } else {
      character = await Character.findOne({
        userId: interaction.user.id,
      }).exec();
    }

    if (!character) {
      interaction.reply({ content: 'Character not found', ephemeral: true });
      return;
    }

    const profileEmbed = buildProfile(character);

    interaction.reply({ embeds: [profileEmbed] });
  },
};

export default getProfile;
