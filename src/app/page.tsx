"use client";

import Sidebar from "./components/sidebar";
import Chatbox from "./components/chatbox";
import { useCallback, useEffect, useState } from "react";
import { Message, Conversation } from "./types";
import { UserId, UserRole } from "./types/user";
import useAuth, { AuthProvider, getUsers } from "./context/user";

export default function Page() {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activePartner, setActivePartner] = useState<UserId | null>(null);

  useEffect(() => console.log("user:", user), [user]);

  const getPartner = (convo: Conversation, role: UserRole) =>
    role === UserRole.Doctor ? convo.patient : convo.doctor;

  const activePartners = conversations.map((convo) =>
    getPartner(convo, user?.role ?? UserRole.Patient)
  );
  const availablePartners = getUsers()
    .filter((u) => u.id !== user?.id && !activePartners.includes(u.id))
    .map((u) => u.id);

  function addMessage(newMessage: Message) {
    const conversation = conversations.find(
      (convo) =>
        getPartner(convo, user?.role ?? UserRole.Patient) === activePartner
    );
    if (!conversation) {
      console.log("no convo", newMessage, activePartner, user?.id);
      return;
    }
    const newConversation = {
      ...conversation,
      messages: conversation.messages.concat([newMessage]),
    };
    setConversations((prevConversations) =>
      prevConversations
        .filter((convo) => convo.doctor !== activePartner)
        .concat(newConversation)
    );
  }

  const getActiveMessages = useCallback(
    () =>
      conversations.find(
        (convo) => convo.patient === user?.id && convo.doctor === activePartner
      )?.messages ?? [],
    [activePartner, user, conversations]
  );

  const getActivePartners = useCallback(
    () => conversations.map((convo) => convo.doctor),
    [conversations]
  );

  const addPartner = (id: UserId) => {
    const newConvo =
      user?.role === UserRole.Doctor
        ? {
            doctor: user?.id ?? "0-0",
            patient: id,
            messages: [],
          }
        : {
            patient: user?.id ?? "0-0",
            doctor: id,
            messages: [],
          };
    console.log(newConvo);
    setConversations((convos) => [...convos, newConvo]);
  };

  return (
    <main style={{ height: "100vh" }}>
      <Sidebar
        activePartners={getActivePartners()}
        availablePartners={availablePartners}
        selectConversation={({ doctor }) => setActivePartner(doctor)}
        activePartner={activePartner}
        addPartner={addPartner}
      />
      <Chatbox
        messages={getActiveMessages()}
        addMessage={addMessage}
        userId={user?.id ?? "0-0"}
        partner={activePartner}
      />
    </main>
  );
}
