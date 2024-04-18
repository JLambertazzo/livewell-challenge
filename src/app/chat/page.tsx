"use client";

import Sidebar from "./components/sidebar";
import Chatbox from "./components/chatbox";
import { useCallback, useState } from "react";
import { Message, Conversation } from "./types";
import { UserId, UserRole } from "../types/user";
import useAuth from "../context/user";

export default function Page() {
  const { user } = useAuth();
  const [doctors, setDoctors] = useState<UserId[]>([
    "654-321",
    "543-216",
    "432-165",
  ]);
  const [patients, setPatients] = useState<UserId[]>([
    "123-456",
    "234-561",
    "345-612",
  ]);
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      patient: "123-456",
      doctor: "654-321",
      messages: [
        {
          sender: UserRole.Patient,
          body: "Hi! I'm looking for a doctor",
        },
        {
          sender: UserRole.Doctor,
          body: "Hi! I'm a doctor :)",
        },
      ],
    },
    {
      patient: "123-456",
      doctor: "543-216",
      messages: [
        {
          sender: UserRole.Patient,
          body: "Hi! I'm looking for a doctor",
        },
        {
          sender: UserRole.Doctor,
          body: "Hi! I'm a different doctor :)",
        },
      ],
    },
  ]);
  const [activePartner, setActivePartner] = useState<UserId>("654-321");

  function addMessage(newMessage: Message) {
    const conversation = conversations.find(
      (convo) => convo.doctor === activePartner
    );
    if (!conversation) {
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

  const addPartner = (id: UserId) =>
    setConversations((convos) => [
      ...convos,
      { doctor: id, patient: user?.id ?? "0-0", messages: [] },
    ]);

  return (
    <main style={{ height: "100vh" }}>
      <Sidebar
        activePartners={getActivePartners()}
        availablePartners={doctors}
        selectConversation={({ doctor }) => setActivePartner(doctor)}
        activePartner={activePartner}
        addPartner={addPartner}
      />
      <Chatbox
        messages={getActiveMessages()}
        addMessage={addMessage}
        userId={user?.id ?? "0-0"}
      />
    </main>
  );
}
