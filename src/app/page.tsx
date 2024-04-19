"use client";

import Sidebar from "./components/sidebar";
import Chatbox from "./components/chatbox";
import { useCallback, useEffect, useState } from "react";
import { Message, Conversation, SidebarProps } from "./types";
import { UserId, UserRole } from "./types/user";
import { useForceAuth } from "./context/auth";
import { useConversationApi, useUserApi } from "./context/api";

export default function Page() {
  const user = useForceAuth();
  const [activePartner, setActivePartner] = useState<UserId | null>(null);
  const { users } = useUserApi();
  const { conversations, addMessage, createConversation } =
    useConversationApi();

  const getPartner = (convo: Conversation, role: UserRole) =>
    role === UserRole.Doctor ? convo.patient : convo.doctor;

  const availablePartners = users
    .filter(
      (u) =>
        u.id !== user.id &&
        conversations.every((convo) => getPartner(convo, user.role) !== u.id)
    )
    .map((u) => u.id);

  function sendMessage(newMessage: Message) {
    const activeConvo = conversations.find(
      (convo) =>
        convo[user.role] === user.id &&
        getPartner(convo, user.role) === activePartner
    );
    if (!activeConvo) {
      return;
    }
    addMessage(activeConvo, newMessage);
  }

  const getActiveMessages = useCallback(
    () =>
      conversations.find(
        (convo) =>
          convo[user.role] === user.id &&
          getPartner(convo, user.role) === activePartner
      )?.messages ?? [],
    [activePartner, user, conversations]
  );

  const addPartner = (id: UserId) => {
    const newConvo =
      user.role === UserRole.Doctor
        ? {
            doctor: user.id,
            patient: id,
            messages: [],
          }
        : {
            patient: user.id,
            doctor: id,
            messages: [],
          };
    createConversation(newConvo);
  };

  return (
    <main style={{ height: "100vh" }}>
      <Sidebar
        activePartners={conversations.map((convo) =>
          getPartner(convo, user.role)
        )}
        availablePartners={availablePartners}
        selectConversation={(filter) =>
          setActivePartner(getPartner({ ...filter, messages: [] }, user.role))
        }
        activePartner={activePartner}
        addPartner={addPartner}
      />
      <Chatbox
        messages={getActiveMessages()}
        addMessage={sendMessage}
        userId={user.id}
        partner={activePartner}
      />
    </main>
  );
}
