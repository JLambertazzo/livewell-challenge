export type UserId = `${number}-${number}`;

export type ChatboxProps = {
  messages: Message[];
  addMessage: (message: Message) => void;
  userId: UserId;
};

export type SidebarProps = {
  activePartners: UserId[];
  availablePartners: UserId[];
  selectConversation: (
    members: Pick<Conversation, "patient" | "doctor">
  ) => void;
  activePartner: UserId;
};

export enum UserRole {
  Doctor = "doctor",
  Patient = "patient",
}

export type Message = {
  sender: UserRole;
  body: string;
};

export type Conversation = {
  patient: UserId;
  doctor: UserId;
  messages: Message[];
};
