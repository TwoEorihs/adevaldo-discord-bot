export enum Roles {
  MEMBER = "962070058031525908",
  BOT = "962097675581423637",
}

export enum BlackRoles {
  MEMBER = "962070058031525908",
  BOT = "962097675581423637",
  BOT_ADMINISTRATOR = "963085759173251112",
  MODERADOR = "962054460991995945",
  ADMINISTRADOR = "962044595112403014",
  SERVER_BOOSTER = "962058427339767889",
}

export type RolesCategorys = {
  name: string;
  emoji: string;
  id: string;
};

export interface RolesList {
  [roles: string]: RolesCategorys[];
}
