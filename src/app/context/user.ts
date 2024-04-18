import { User } from "../types/user";

const USER_KEY = "livewell-demo-user";

export function setUser(user: User | null) {
  if (!user) {
    localStorage.removeItem(USER_KEY);
  } else {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
}

export function getUser() {
  const user = localStorage.getItem(USER_KEY);
  if (!user) {
    return null;
  }
  return JSON.stringify(user);
}
