import {
  ActionRowBuilder,
  CommandInteraction,
  ModalBuilder,
  ModalSubmitInteraction,
  SlashCommandBuilder,
  TextInputBuilder,
  TextInputStyle,
} from 'discord.js';
import { setTimeout } from 'timers/promises';
import { ICommandModalInteraction } from '../interfaces/command';
import { Character } from '../schemas/character';

export const newPlayer: ICommandModalInteraction = {
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
    await interaction.deferReply();

    const characterName =
      interaction.fields.getTextInputValue('chararacter_name');
    const characterSpecies = interaction.fields.getTextInputValue(
      'chararacter_species'
    );

    const newCharacter = new Character({
      userId: interaction.member?.user.id,
      characterName: characterName,
      characterSpecies: characterSpecies,
      characterAttr: {
        cha: 100,
        con: 100,
        dex: 100,
        str: 100,
        int: 100,
      },
      characterEter: 10,
      characterHealth: 10,
    });

    await newCharacter.save();

    await interaction.reply('Created new character');

    return;
  },
};
