import {
  ICommandInteraction,
  ICommandModalInteraction,
} from '../interfaces/command';
import * as misc from './misc';
import * as player from './player';

// Place all commands here for registering
export const commands: ICommandInteraction[] | ICommandModalInteraction[] = [
  misc.ping,
  player.newPlayer,
];
