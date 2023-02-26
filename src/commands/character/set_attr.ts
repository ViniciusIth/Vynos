import { CommandInteraction, SlashCommandBuilder } from 'discord.js';
import { ICommandInteraction } from '../../interfaces/command';
import { Character } from '../../schemas/character';
import { reloadCharacterSheet } from '../../utils/character.utils';

const setAttributes: ICommandInteraction = {
  data: new SlashCommandBuilder()
    .setName('set_attr')
    .setDescription('allows for attributes definition')
    .addStringOption((option) =>
      option
        .setName('attribute')
        .setDescription('The attribute to change')
        .setRequired(true)
        .addChoices(
          { name: 'STR', value: 'str' },
          { name: 'DEX', value: 'dex' },
          { name: 'CON', value: 'con' },
          { name: 'CHA', value: 'cha' },
          { name: 'INT', value: 'int' }
        )
    )
    .addIntegerOption((option) =>
      option
        .setName('value')
        .setDescription('The new value for the attribute')
        .setRequired(true)
    ),

  async execute(interaction: CommandInteraction): Promise<void> {
    const attribute = interaction.options.get('attribute')?.value as string;
    const newValue = interaction.options.get('value')?.value;

    const updateObj: any = {};
    updateObj['attributes.' + attribute] = newValue;

    console.log(JSON.stringify(updateObj));

    const character = await Character.findOneAndUpdate(
      { userId: interaction.user.id },
      updateObj,
      { new: true }
    ).exec();

    if (!character) {
      interaction.reply({ content: 'Character not found!', ephemeral: true });
      return;
    }

    await reloadCharacterSheet(character, interaction.client);

    interaction.reply({
      content: `${attribute} set to ${newValue}`,
      ephemeral: true,
    });
  },
};

export default setAttributes;
