export type IRoleType = "bot" | "admin" | "member";

export type IRole = {
  emoji?: string;
  id: string;
  type: IRoleType | string;
};

export type IRolesList = {
  [roleName: string]: IRole;
};
