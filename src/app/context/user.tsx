import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "../types/user";

const userContext = createContext({
  user: null as User | null,
  setUser: ((user) => {
    void user;
  }) as (user: User | null) => void,
});

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const local = localStorage.getItem("user");
  const localUser = local ? JSON.parse(local) : null;
  const [user, setUser] = useState<User | null>(localUser);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.clear();
    }
  }, [user]);

  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
}

export default function useAuth() {
  return useContext(userContext);
}
