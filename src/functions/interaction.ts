import { Interaction, InteractionType } from 'discord.js';
import { commands } from '../commands/commands';
import { ICommandModalInteraction } from '../interfaces/command';

export async function onInteraction(interaction: Interaction) {
  // Executes the 'execute' method of all commands
  if (interaction.isCommand())
    for (const command of commands) {
      if (interaction.commandName === command.data.name) {
        await command.execute(interaction);
        break;
      }
    }

  // Executes the 'handle' method of all commands with modals
  if (interaction.type === InteractionType.ModalSubmit)
    for (const modalCommand of commands as ICommandModalInteraction[]) {
      if (interaction.customId === modalCommand.data.name) {
        await modalCommand.handle(interaction);
      }
    }
}
