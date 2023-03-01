import { CommandInteraction, SlashCommandBuilder } from 'discord.js';
import { charNotFoundError } from '../../embeds/error/character_not_found';
import { ICommandInteraction } from '../../interfaces/command';
import { Character } from '../../schemas/character';
import { reloadCharacterSheet } from '../../utils/character.utils';

const setProfile: ICommandInteraction = {
  data: new SlashCommandBuilder()
    .setName('set_profile')
    .setDescription('allows for status definition')
    .addStringOption((option) =>
      option
        .setName('profile')
        .setDescription('The profile detail to change')
        .setRequired(true)
        .addChoices(
          { name: 'Nome', value: 'name' },
          { name: 'Raça', value: 'race' }
        )
    )
    .addStringOption((option) =>
      option
        .setName('value')
        .setDescription('The new value for the bit')
        .setRequired(true)
    ),

  async execute(interaction: CommandInteraction): Promise<void> {
    const profile = interaction.options.get('profile')?.value as string;
    const newValue = interaction.options.get('value')?.value;

    const updateObj: any = {};
    updateObj[profile] = newValue;

    console.log(JSON.stringify(updateObj));

    const character = await Character.findOneAndUpdate(
      {
        $or: [
          { guildChannelId: interaction.channelId },
          { userId: interaction.user.id },
        ],
      },
      updateObj,
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
      content: `${profile} set to ${newValue}`,
      ephemeral: true,
    });
  },
};

export default setProfile;
