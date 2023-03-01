import chalk from 'chalk';
import {
  ActionRowBuilder,
  CommandInteraction,
  ModalBuilder,
  ModalSubmitInteraction,
  SlashCommandBuilder,
  TextInputBuilder,
  TextInputStyle,
} from 'discord.js';
import { charNotFoundError } from '../../embeds/error/character_not_found';
import { ICommandModalInteraction } from '../../interfaces/command';
import { Character } from '../../schemas/character';
import { reloadCharacterSheet } from '../../utils/character.utils';

const setStory: ICommandModalInteraction = {
  data: new SlashCommandBuilder()
    .setName('set_story')
    .setDescription('Sets the character story side'),

  async execute(interaction: CommandInteraction): Promise<void> {
    const character = await Character.findOne({
      $or: [
        { guildChannelId: interaction.channelId },
        { userId: interaction.user.id },
      ],
    });

    if (!character) {
      interaction.reply({
        embeds: [charNotFoundError(interaction)],
        ephemeral: true,
      });
      return;
    }

    const modal = new ModalBuilder()
      .setTitle('Character Story')
      .setCustomId('set_story');

    const characterStoryInput = new TextInputBuilder()
      .setCustomId('character_story')
      .setLabel('Character Story')
      .setStyle(TextInputStyle.Paragraph);

    const firstActionRow: any = new ActionRowBuilder().addComponents(
      characterStoryInput
    );

    modal.addComponents(firstActionRow);

    await interaction.showModal(modal);
  },

  async handle(interaction: ModalSubmitInteraction) {
    const characterStory =
      interaction.fields.getTextInputValue('character_story');

    try {
      const character = await Character.findOneAndUpdate(
        {
          guildChannelId: interaction.channelId,
        },
        {
          story: characterStory,
        },
        { new: true }
      ).exec();

      if (!character) {
        interaction.reply({
          content: 'É necessário utilizar este comando no seu canal!',
          ephemeral: true,
        });
        return;
      }

      await reloadCharacterSheet(character, interaction.client);

      interaction.reply({
        content: 'Story edited successfully ✅',
        ephemeral: true,
      });
    } catch (error) {
      console.error(`Error updating character story:\n ${chalk.red(error)}`);
      interaction.reply({
        content: 'There was an error updating the character story ❌',
        ephemeral: true,
      });
    }
  },
};

export default setStory;
