"use client";

import Sidebar from "./components/sidebar";
import Chatbox from "./components/chatbox";
import { useState } from "react";
import { Message } from "./types";

export default function Page() {
  const [messages, setMessages] = useState<Message[]>([
    {
      author: "123-456",
      body: "Hi there! I'm looking for a doctor",
    },
    {
      author: "654-321",
      body: "Hi! I am a doctor :)",
    },
  ]);

  function addMessage(newMessage: Message) {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  }

  return (
    <main style={{ height: "100vh" }}>
      <Sidebar />
      <Chatbox messages={messages} addMessage={addMessage} userId="123-456" />
    </main>
  );
}
