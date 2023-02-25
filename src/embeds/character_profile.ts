import { EmbedBuilder } from 'discord.js';
import { ICharacter } from '../interfaces/character';

function buildProfile(character: ICharacter) {
  const characterProfile = new EmbedBuilder()
    .setDescription(
      `
> ${character.name}
> ${character.race}
> LVL: ${character.level}

**Aparência**
    `
    )
    .setImage(character.imageUrl!);

  return characterProfile;
}

export default buildProfile;
