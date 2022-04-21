import { Client, GuildMember } from "discord.js";
import { Roles } from "../models/roles.enum";

export default async (member: GuildMember) => {
  if (member.user.bot) member.roles.add(Roles.BOT);
  else member.roles.add(Roles.MEMBER);
};
