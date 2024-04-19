import { UserId, UserRole } from "./types/user";

export type ChatboxProps = {
  messages: Message[];
  addMessage: (message: Message) => void;
  userId: UserId;
  partner: UserId | null;
};

export type SidebarProps = {
  activePartners: UserId[];
  availablePartners: UserId[];
  selectConversation: (
    members: Pick<Conversation, UserRole.Patient | UserRole.Doctor>
  ) => void;
  activePartner: UserId | null;
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
