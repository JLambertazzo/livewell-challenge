export type UserId = `${number}-${number}`;

export enum UserRole {
  Doctor = "doctor",
  Patient = "patient",
}

export const isUserRole = (input: string): input is UserRole =>
  input === UserRole.Doctor || input === UserRole.Patient;

export type User = {
  id: UserId;
  role: UserRole;
  username: string;
  password: string;
  fullname: string;
};

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

/**
 * The Message data structure has only two fields, a sender to determine which side of the screen to display
 * the message on, and the body which is the actual content of the message
 */
export type Message = {
  sender: UserRole;
  body: string;
};

/**
 * Conversation structure was the main decision I made regarding data structures
 * I use 3 fields: patient, doctor, and messages
 * By using patient and doctor, accessing conversations is simple as no user "owns" a conversation (which
 * could happen if conversations were a field within the user structure for example)
 * I structured it this way based on the assumption that patients can't communicate with other
 * patients, and the same goes for doctors.
 */
export type Conversation = {
  [UserRole.Patient]: UserId;
  [UserRole.Doctor]: UserId;
  messages: Message[];
};
