export type RoleType = "bot" | "admin" | "member";

export type Role = {
  name: string;
  emoji?: string;
  type: RoleType;
  id: string;
};

export type RolesList = Role[];
