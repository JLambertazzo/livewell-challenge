import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { User, UserRole } from "../types/user";
import { useRouter } from "next/navigation";

const LOCAL_USER_KEY = "livewell-demo-user";

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
  const local = localStorage.getItem(LOCAL_USER_KEY);
  const localUser = local ? JSON.parse(local) : null;
  const [user, setUser] = useState<User | null>(localUser);

  useEffect(() => {
    if (user) {
      localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(user));
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

export function useForceAuth(): User {
  const { user } = useAuth();
  const router = useRouter();

  if (!user) {
    router.push("/login");
  }
  return (
    user ?? {
      id: "0-0",
      role: UserRole.Patient,
      username: "",
    }
  );
}

export default function useAuth() {
  return useContext(userContext);
}
