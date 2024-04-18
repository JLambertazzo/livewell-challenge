export type ChatboxProps = {
  messages: Message[];
  addMessage: (message: Message) => void;
  userId: string;
};

export enum UserRole {
  Doctor = "doctor",
  Patient = "patient",
}

export type Message = {
  sender: UserRole;
  body: string;
};
