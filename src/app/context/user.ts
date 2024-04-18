import { User } from "../types/user";

export function setUser(user: User) {
  localStorage.setItem("user", JSON.stringify(user));
}

export function getUser() {
  const user = localStorage.getItem("user");
  if (!user) {
    return null;
  }
  return JSON.stringify(user);
}
