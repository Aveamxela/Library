import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { users } from "../schemas/users";

export type User = InferSelectModel<typeof users>;

export type NewUser = InferInsertModel<typeof users>;

export type UserColumns = { [K in keyof User]?: boolean };