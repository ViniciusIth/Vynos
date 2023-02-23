import { ICommandModalInteraction } from './../interfaces/command';
import {
  ActionRowBuilder,
  CommandInteraction,
  ModalBuilder,
  SlashCommandBuilder,
  TextInputBuilder,
  TextInputStyle,
} from 'discord.js';

export const modal_example: ICommandModalInteraction = {
  data: new SlashCommandBuilder()
    .setName('modal_example')
    .setDescription('Replies with pong and latency!'),

  async execute(interaction: CommandInteraction): Promise<void> {
    const modal = new ModalBuilder()
      .setTitle('Example Modal')
      .setCustomId('modal_example');

    const modalInput = new TextInputBuilder()
      .setLabel('Enter text')
      .setCustomId('modal_input')
      .setStyle(TextInputStyle.Short);

    const actionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(
      modalInput
    );

    modal.addComponents(actionRow);

    await interaction.showModal(modal);
  },

  async handle(interaction) {
    const input = interaction.fields.getTextInputValue('modal_input');

    await interaction.reply(`input = \`${input}\``);
  },
};
