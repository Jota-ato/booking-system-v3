import { createAccessControl } from "better-auth/plugins/access";
import { defaultStatements, adminAc } from "better-auth/plugins/admin/access";

export const statement = {
  ...defaultStatements,
  appointment: [
    "create",
    "read-own",
    "read-all",
    "update-own",
    "update-all",
    "cancel-own",
    "cancel-all",
    "delete",
  ],
  service: ["create", "read", "update", "delete"],
  staff: ["read", "update", "approve", "delete"],
  schedule: ["read", "update"],
} as const;

export const ac = createAccessControl(statement);

export const admin = ac.newRole({
  ...adminAc.statements,
  appointment: [
    "create",
    "read-own",
    "read-all",
    "update-own",
    "update-all",
    "cancel-own",
    "cancel-all",
    "delete",
  ],
  service: ["create", "read", "update", "delete"],
  staff: ["read", "update", "approve", "delete"],
  schedule: ["read", "update"],
});

export const staff = ac.newRole({
  appointment: ["create", "read-own", "update-own", "cancel-own"],
  service: ["read"],
  schedule: ["read"],
});

export const pending = ac.newRole({});
