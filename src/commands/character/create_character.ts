import {
  ActionRowBuilder,
  ChannelType,
  CommandInteraction,
  EmbedBuilder,
  ModalBuilder,
  ModalSubmitInteraction,
  PermissionsBitField,
  SlashCommandBuilder,
  TextInputBuilder,
  TextInputStyle,
} from 'discord.js';
import buildDetails from '../../embeds/character_details';
import buildStatus from '../../embeds/character_status';
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
      permissionOverwrites: [
        {
          id: interaction.guild!.id,
          deny: [PermissionsBitField.All],
        },
        {
          id: interaction.user.id,
          allow: [PermissionsBitField.Default],
        },
      ],
    })!;

    const channelMessage = await newChannel.send('Creating character...');

    const profilePics = [
      'https://i.pinimg.com/564x/81/70/21/81702128c4248529f9dc6e7506432004.jpg',
      'https://i.pinimg.com/564x/3f/de/86/3fde8620893d9a399a8f9214c76cdc9a.jpg',
      'https://i.pinimg.com/564x/6e/10/65/6e10655a613a2e5d35a0cf207b245266.jpg',
      'https://i.pinimg.com/564x/72/63/8c/72638ca88f1ddbc8913bcbf24947b7b7.jpg',
    ];

    const random = Math.floor(Math.random() * profilePics.length);

    const newCharacter = new Character({
      userId: user.id,
      guildChannelId: newChannel?.id,
      embedMessageId: channelMessage.id,

      name: characterName,
      race: characterRace,

      imageUrl: profilePics[random],
    });

    await newCharacter.save();

    const characterDetails = buildDetails(newCharacter);
    const characterStatus = buildStatus(newCharacter);

    await channelMessage.edit({
      content: '',
      embeds: [characterDetails, characterStatus],
    });

    await interaction.editReply(
      `Novo personagem criado em <#${newChannel?.id}>`
    );
  },
};

export default createCharacter;
