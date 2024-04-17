export type ChatboxProps = {
  messages: Message[];
  addMessage: (message: Message) => void;
  userId: string;
};

export type Message = {
  author: string;
  body: string;
};
