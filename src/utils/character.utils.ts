import { Client } from 'discord.js';
import buildDetails from '../embeds/character_details';
import buildStatus from '../embeds/character_status';
import { ICharacter } from '../interfaces/character';
import { getMessage } from './misc.utils';

export async function reloadCharacterSheet(
  character: ICharacter,
  client: Client
) {
  const message = await getMessage(
    character.guildChannelId,
    character.embedMessageId,
    client
  );

  const characterDetails = buildDetails(character);
  const characterStatus = buildStatus(character);

  await message.edit({ embeds: [characterDetails, characterStatus] });
}

export function getDecimalPart(number: number) {
  return Math.floor((number - 100) / 10);
}