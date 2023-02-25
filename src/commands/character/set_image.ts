import chalk from 'chalk';
import { CommandInteraction, SlashCommandBuilder } from 'discord.js';
import { ICommandInteraction } from '../../interfaces/command';
import { Character } from '../../schemas/character';
import { reloadCharacterSheet } from '../../utils/character.utils';

const setImage: ICommandInteraction = {
  data: new SlashCommandBuilder()
    .setName('set_image')
    .setDescription('changes character image')
    .addStringOption((option) =>
      option
        .setName('character_image_url')
        .setDescription('New image url')
        .setRequired(true)
    ),

  async execute(interaction: CommandInteraction): Promise<void> {
    const characterImage = interaction.options.get(
      'character_image_url'
    )?.value;

    try {
      const character = await Character.findOneAndUpdate(
        {
          userId: interaction.user.id,
        },
        { imageUrl: characterImage },
        { new: true }
      ).exec();

      if (!character) {
        throw new Error('Character not found');
      }

      await reloadCharacterSheet(character, interaction.client);

      interaction.reply('Image set successfully ✅');
    } catch (error) {
      console.error(`Error updating character mage:\n ${chalk.red(error)}`);
      interaction.reply('There was an error updating the character image ❌');
    }
  },
};

export default setImage;
