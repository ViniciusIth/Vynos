import {
  ActionRowBuilder,
  ChannelType,
  CommandInteraction,
  EmbedBuilder,
  ModalBuilder,
  ModalSubmitInteraction,
  SlashCommandBuilder,
  TextInputBuilder,
  TextInputStyle,
} from 'discord.js';
import { ICommandModalInteraction } from '../../interfaces/command';
import { Character } from '../../schemas/character';

const createCharacter: ICommandModalInteraction = {
  data: new SlashCommandBuilder()
    .setName('create_character')
    .setDescription('Setup a new player on the server!'),

  async execute(interaction: CommandInteraction) {
    const modal = new ModalBuilder()
      .setTitle('Character Creation')
      .setCustomId('create_character');

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

    const guild = interaction.guild!;
    const user = interaction.member?.user!;

    const characterName =
      interaction.fields.getTextInputValue('chararacter_name');
    const characterRace = interaction.fields.getTextInputValue(
      'chararacter_species'
    );

    const newChannel = await guild.channels.create({
      name: characterName,
      type: ChannelType.GuildText,
      parent: '1078473060308484176',
    })!;

    const channelMessage = await newChannel.send('Creating character...');

    const newCharacter = new Character({
      userId: user.id,
      guildChannelId: newChannel?.id,
      embedMessageId: channelMessage.id,

      name: characterName,
      race: characterRace,

      imageUrl: '',
      story: '',
    });

    await newCharacter.save();

    const characterAttr = newCharacter.attributes;

    const characterDetails = new EmbedBuilder()
      .setDescription(
        `
> Nome: ${newCharacter.name}
> Raça: ${newCharacter.race}
> ID: ${newCharacter._id}

**História**
${newCharacter.story}`
      )
      .addFields(
        {
          name: 'cha',
          value: `${characterAttr?.cha} -> ${characterAttr?.cha! / 100}`,
          inline: true,
        },
        {
          name: 'con',
          value: `${characterAttr?.con} -> ${characterAttr?.con! / 100}`,
          inline: true,
        },
        {
          name: 'dex',
          value: `${characterAttr?.dex} -> ${characterAttr?.dex! / 100}`,
          inline: true,
        },
        {
          name: 'str',
          value: `${characterAttr?.str} -> ${characterAttr?.str! / 100}`,
          inline: true,
        },
        {
          name: 'int',
          value: `${characterAttr?.int} -> ${characterAttr?.int! / 100}`,
          inline: true,
        }
      );

    const characterStatus = new EmbedBuilder().setTitle('Status')
      .setDescription(`
> Level: ${newCharacter.level}
> HP: ${newCharacter.maxHealth}
> PE: ${newCharacter.maxEter}`);

    await channelMessage.edit({
      content: `Editado as ${new Date().toString()}`,
      embeds: [characterDetails, characterStatus],
    });

    await interaction.editReply(
      `Novo personagem criado em <#${newChannel?.id}>`
    );
  },
};

export default createCharacter;
