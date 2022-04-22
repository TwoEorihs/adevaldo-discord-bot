import { Client, Interaction } from "discord.js";

export default async (interaction: Interaction) => {
  if (
    !interaction.isCommand ||
    !interaction.isButton ||
    !interaction.isSelectMenu
  )
    return;

  console.log(interaction);
};
