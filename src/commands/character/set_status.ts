import { CommandInteraction, SlashCommandBuilder } from 'discord.js';
import { ICommandInteraction } from '../../interfaces/command';
import { Character } from '../../schemas/character';
import { reloadCharacterSheet } from '../../utils/character.utils';

const setStatus: ICommandInteraction = {
  data: new SlashCommandBuilder()
    .setName('set_status')
    .setDescription('allows for status definition')
    .addStringOption((option) =>
      option
        .setName('status')
        .setDescription('The status to change')
        .setRequired(true)
        .addChoices(
          { name: 'LVL', value: 'level' },
          { name: 'HP', value: 'maxHealth' },
          { name: 'PE', value: 'maxEter' }
        )
    )
    .addIntegerOption((option) =>
      option
        .setName('value')
        .setDescription('The new value for the status')
        .setRequired(true)
    ),

  async execute(interaction: CommandInteraction): Promise<void> {
    const status = interaction.options.get('status')?.value as string;
    const newValue = interaction.options.get('value')?.value;

    const updateObj: any = {};
    updateObj[status] = newValue;

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
      content: `${status} set to ${newValue}`,
      ephemeral: true,
    });
  },
};

export default setStatus;
