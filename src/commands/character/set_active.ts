import { CommandInteraction, SlashCommandBuilder } from 'discord.js';
import { ICommandInteraction } from '../../interfaces/command';
import { Character, characterSchema } from '../../schemas/character';
import { User } from '../../schemas/user';

const setActive: ICommandInteraction = {
  data: new SlashCommandBuilder()
    .setName('set_active')
    .setDescription('sets the active character')
    .addStringOption((option) =>
      option
        .setName('character_id')
        .setDescription('The chosen character')
        .setRequired(true)
    ),
  async execute(interaction: CommandInteraction): Promise<void> {
    const characterId = interaction.options.get('character_id')?.value;

    await User.findOneAndUpdate(
      { userId: interaction.member?.user.id },
      { activeCharacter: characterId }
    ).exec();

    const character = await Character.findById(characterId).exec();

    interaction.reply(`Active character changed to ${character?.name}`);
  },
};

export default setActive;
