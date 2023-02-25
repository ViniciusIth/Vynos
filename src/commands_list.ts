import {
  ICommandInteraction,
  ICommandModalInteraction,
} from './interfaces/command';
import setStatus from './commands/character/set_status';
import ping from './commands/misc/ping';
import createCharacter from './commands/character/create_character';
import getProfile from './commands/character/get_profile';
import setStory from './commands/character/set_story';

// Place all commands here for registering
export const commands: ICommandInteraction[] | ICommandModalInteraction[] = [
  ping,
  createCharacter,
  setStatus,
  setStory,
  getProfile,
];
