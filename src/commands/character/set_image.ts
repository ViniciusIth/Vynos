import chalk from 'chalk';
import { CommandInteraction, SlashCommandBuilder } from 'discord.js';
import { charNotFoundError } from '../../embeds/error/character_not_found';
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
          $or: [
            { guildChannelId: interaction.channelId },
            { userId: interaction.user.id },
          ],
        },
        { imageUrl: characterImage },
        { new: true }
      ).exec();

      if (!character) {
        interaction.reply({
          embeds: [charNotFoundError(interaction)],
          ephemeral: true,
        });
        return;
      }

      await reloadCharacterSheet(character, interaction.client);

      interaction.reply({
        content: 'Image set successfully ✅',
        ephemeral: true,
      });
    } catch (error) {
      console.error(`Error updating character mage:\n ${chalk.red(error)}`);
      interaction.reply({
        content: 'There was an error updating the character image ❌',
        ephemeral: true,
      });
    }
  },
};

export default setImage;
