import {
  SlashCommandBuilder,
  SlashCommandSubcommandsOnlyBuilder,
  CommandInteraction,
  ModalSubmitInteraction,
} from 'discord.js';


/**
 * Must be implemented in every command
 */
export interface ICommandInteraction {
  data: SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder;
  execute: (interaction: CommandInteraction) => Promise<void>;
}

/**
* Used for every command that needs to handle a single modal
* @summary works in a similar way to ICommandInteraction, but
  defines how to handle submitions from modals. For it to work 
  the command name defined in data and the modal custom id must
  be the same.
*/
export interface ICommandModalInteraction {
  data: SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder;
  execute: (interaction: CommandInteraction) => Promise<void>;
  handle: (interaction: ModalSubmitInteraction) => Promise<void>;
}
