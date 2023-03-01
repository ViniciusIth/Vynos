import { CommandInteraction, SlashCommandBuilder } from 'discord.js';
import { ICommandInteraction } from '../../interfaces/command';
import { Character } from '../../schemas/character';
import { reloadCharacterSheet } from '../../utils/character.utils';

const reload: ICommandInteraction = {
  data: new SlashCommandBuilder()
    .setName('reload_sheet')
    .setDescription('reloads character sheet'),
  async execute(interaction: CommandInteraction): Promise<void> {
    const character = await Character.findOne({
      userId: interaction.user.id,
    }).exec();

    if (!character) {
      interaction.reply({ content: 'Character not found', ephemeral: true });
      return;
    }

    await reloadCharacterSheet(character, interaction.client);

    interaction.reply({ content: 'Reload successfully', ephemeral: true });
  },
};

export default reload;
