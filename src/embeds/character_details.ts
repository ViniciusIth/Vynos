import { EmbedBuilder } from 'discord.js';
import { ICharacter } from '../interfaces/character';

function buildDetails(character: ICharacter) {
  const characterDetails = new EmbedBuilder()
    .setDescription(
      `
> Nome: ${character.name}
> Raça: ${character.race}
> ID: ${character._id}

**História**
${character.story}`
    )
    .addFields(
      {
        name: 'cha',
        value: `${character.attributes?.cha} -> ${
          character.attributes?.cha! / 100
        }`,
        inline: true,
      },
      {
        name: 'con',
        value: `${character.attributes?.con} -> ${
          character.attributes?.con! / 100
        }`,
        inline: true,
      },
      {
        name: 'dex',
        value: `${character.attributes?.dex} -> ${
          character.attributes?.dex! / 100
        }`,
        inline: true,
      },
      {
        name: 'str',
        value: `${character.attributes?.str} -> ${
          character.attributes?.str! / 100
        }`,
        inline: true,
      },
      {
        name: 'int',
        value: `${character.attributes?.int} -> ${
          character.attributes?.int! / 100
        }`,
        inline: true,
      }
    );

  return characterDetails;
}

export default buildDetails;
