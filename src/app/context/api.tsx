// Interface to local storage of data - to be replaced by API calls

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Conversation, Message, User, UserId, UserRole } from "../types";

const LOCAL_USERS_KEY = "livewell-demo-users";
const LOCAL_CONVERSATIONS_KEY = "livewell-demo-convos";

// mimics database id, such as MongoDB's ObjectId
const getId = (): UserId =>
  `${Math.round(Math.random() * 100)}-${Math.round(Math.random() * 100)}`;

const apiContext = createContext({
  users: [] as User[],
  setUsers: (() => {}) as Dispatch<SetStateAction<User[]>>,
  conversations: [] as Conversation[],
  setConversations: (() => {}) as Dispatch<SetStateAction<Conversation[]>>,
});

const defaultUsers: readonly User[] = [
  {
    id: "123-456",
    role: UserRole.Patient,
    fullname: "Julien Bertazzo Lambert",
    username: "patient",
    password: "patient",
  },
  {
    id: "654-321",
    role: UserRole.Doctor,
    fullname: "Theresa Tam",
    username: "doctor",
    password: "doctor",
  },
];

export function ApiProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  let localUsers = null;
  let localConvos = null;
  if (typeof window !== "undefined") {
    localUsers = localStorage.getItem(LOCAL_USERS_KEY);
    localConvos = localStorage.getItem(LOCAL_CONVERSATIONS_KEY);
  }
  const [users, setUsers] = useState<User[]>(
    localUsers && localUsers !== "undefined"
      ? JSON.parse(localUsers)
      : defaultUsers
  );
  const [conversations, setConversations] = useState<Conversation[]>(
    localConvos && localConvos !== "undefined" ? JSON.parse(localConvos) : []
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (users) {
      localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(users));
    } else {
      localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(defaultUsers));
    }
  }, [users]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (conversations) {
      localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(setConversations));
    } else {
      localStorage.setItem(LOCAL_CONVERSATIONS_KEY, JSON.stringify([]));
    }
  }, [conversations]);

  return (
    <apiContext.Provider
      value={{ users, setUsers, conversations, setConversations }}
    >
      {children}
    </apiContext.Provider>
  );
}

// above provides storage, below is interface

function useApi() {
  return useContext(apiContext);
}

export type UserController = {
  users: User[];
  createUser: (user: Omit<User, "id">) => User;
};

export type ConversationController = {
  conversations: Conversation[];
  createConversation: (convo: Conversation) => Conversation;
  addMessage: (convo: Conversation, message: Message) => Conversation;
};

export function useUserApi(): UserController {
  const { users, setUsers } = useApi();
  return {
    users: users.length > 0 ? users : [...defaultUsers],
    createUser: (user) => {
      const newUser: User = {
        ...user,
        id: getId(),
      };
      setUsers((prevUsers) => [...prevUsers, newUser]);
      return newUser;
    },
  };
}

export function useConversationApi(): ConversationController {
  const { conversations, setConversations } = useApi();
  return {
    conversations,
    createConversation: (convo) => {
      setConversations((prevConvos) => [...prevConvos, convo]);
      return convo;
    },
    addMessage: (convo, msg) => {
      const updatedConvo: Conversation = {
        ...convo,
        messages: [...convo.messages, msg],
      };
      setConversations((prevConversations) =>
        prevConversations
          .filter(
            (prevConvo) =>
              prevConvo.doctor !== convo.doctor &&
              prevConvo.patient !== convo.patient
          )
          .concat(updatedConvo)
      );
      return updatedConvo;
    },
  };
}
