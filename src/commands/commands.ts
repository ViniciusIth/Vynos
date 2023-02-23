import {
  ICommandInteraction,
  ICommandModalInteraction,
} from '../interfaces/command';
import * as misc from './misc';
import * as modal from './modal';

// Place all commands here for registering
export const commands: ICommandInteraction[] | ICommandModalInteraction[] = [
  misc.ping,
  modal.modal_example,
];
