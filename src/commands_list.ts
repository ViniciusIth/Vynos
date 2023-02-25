import {
  ICommandInteraction,
  ICommandModalInteraction,
} from './interfaces/command';
import ping from './commands/misc/ping';

// Place all commands here for registering
export const commands: ICommandInteraction[] | ICommandModalInteraction[] = [
  ping,
];
