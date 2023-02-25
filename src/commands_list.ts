import {
  ICommandInteraction,
  ICommandModalInteraction,
} from './interfaces/command';
import setStatus from './commands/character/set_status';
import ping from './commands/misc/ping';
import createCharacter from './commands/character/create_character';
import setActive from './commands/character/set_active';
import getCharacter from './commands/character/get_character';

// Place all commands here for registering
export const commands: ICommandInteraction[] | ICommandModalInteraction[] = [
  ping,
  createCharacter,
  setActive,
  setStatus,
  getCharacter,
];
