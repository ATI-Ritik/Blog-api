import { type User, users } from "./data";

export function getUserById(id: number): User | undefined {
  return users.find((user) => user.id === id);
}
