import { User, UserId, UserRole } from "./types/user";

export type ChatboxProps = {
  messages: Message[];
  addMessage: (message: Message) => void;
  userId: UserId;
  partner: User | undefined;
};

export type SidebarProps = {
  activePartners: User[];
  availablePartners: User[];
  selectConversation: (
    members: Pick<Conversation, UserRole.Patient | UserRole.Doctor>
  ) => void;
  activePartner: UserId | undefined;
  addPartner: (partnerId: UserId) => void;
};

export type Message = {
  sender: UserRole;
  body: string;
};

export type Conversation = {
  [UserRole.Patient]: UserId;
  [UserRole.Doctor]: UserId;
  messages: Message[];
};
