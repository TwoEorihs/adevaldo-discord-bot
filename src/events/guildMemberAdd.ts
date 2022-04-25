import { GuildMember } from "discord.js";
import config from "../config";
export default async (member: GuildMember) => {
  if (member.user.bot && config?.rolesList?.["bot"]?.id)
    member.roles.add(config?.rolesList?.["bot"]?.id);
  else if (config?.rolesList?.["membro"]?.id)
    member.roles.add(config?.rolesList?.["membro"]?.id);
};
