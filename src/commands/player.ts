import {
  ActionRowBuilder,
  CacheType,
  CommandInteraction,
  ModalBuilder,
  ModalSubmitInteraction,
  SlashCommandBuilder,
  TextInputBuilder,
  TextInputStyle,
} from 'discord.js';
import { ModalInt } from '../interfaces/command';

export const newPlayer: ModalInt = {
  data: new SlashCommandBuilder()
    .setName('new_character')
    .setDescription('Setup a new player on the server!'),

  async execute(interaction: CommandInteraction) {
    const modal = new ModalBuilder()
      .setTitle('Character Creation')
      .setCustomId('new_character');

    const characterNameInput = new TextInputBuilder()
      .setCustomId('chararacter_name')
      .setLabel('Character Name')
      .setStyle(TextInputStyle.Short);

    const firstActionRow: any = new ActionRowBuilder().addComponents(
      characterNameInput
    );

    const characterSpeciesInput = new TextInputBuilder()
      .setCustomId('chararacter_species')
      .setLabel('Character Species')
      .setStyle(TextInputStyle.Short);

    const secondActionRow: any = new ActionRowBuilder().addComponents(
      characterSpeciesInput
    );

    modal.addComponents(firstActionRow, secondActionRow);

    await interaction.showModal(modal);
  },

  async handle(interaction: ModalSubmitInteraction): Promise<void> {
    const characterName =
      interaction.fields.getTextInputValue('chararacter_name');
    const characterSpecies = interaction.fields.getTextInputValue(
      'chararacter_species'
    );

    await interaction.reply(`${characterName} - ${characterSpecies}`);
  },
};
