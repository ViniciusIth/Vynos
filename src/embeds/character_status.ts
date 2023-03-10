import { EmbedBuilder } from 'discord.js';
import { ICharacter } from '../interfaces/character';

function buildStatus(character: ICharacter) {
  const characterStatus = new EmbedBuilder().setTitle('Status').setDescription(`
> Level: ${character.level}
> HP: ${character.maxHealth}
> PE: ${character.maxEter}`);

  return characterStatus;
}

export default buildStatus;
