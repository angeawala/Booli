"use client";

import { useState } from "react";

export default function ChatModal() {
  const [isVisible, setIsVisible] = useState(false);

  const handleChatClick = () => {
    setIsVisible(true);
  };

  const handleCloseClick = () => {
    setIsVisible(false);
  };

  const handleStartChat = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (e.detail === 2) { // Double-click
      window.location.href = "/message-chat";
    }
  };

  return (
    <>
      <a href="#" className="messaging-icon" title="Envoyer un message" id="chatButton" onClick={handleChatClick}>
        <i className="fas fa-envelope" id="iocon"></i>
      </a>
      <div className={`chat-modal ${isVisible ? "" : "hidden"}`} id="chatModal">
        <div className="chat-container">
          <div className="chat-header">
            <h2>Messagerie *** Discutez directement !</h2>
            <button id="closeModal" className="close-button1" onClick={handleCloseClick}>
              ✖
            </button>
          </div>
          <div className="chat-welcome">Bienvenue dans la messagerie. Entrez votre compte pour commencer la discussion.</div>
          <div className="chat-form">
            <label htmlFor="email">Email du compte</label>
            <input type="email" id="email" placeholder="Votre email" />

            <label htmlFor="fullName">Nom complet</label>
            <input type="text" id="fullName" placeholder="Votre nom" />

            <label htmlFor="password">Mot de passe</label>
            <input type="password" id="password" placeholder="Votre mot de passe" />

            <button id="startChat" onDoubleClick={handleStartChat} className="start-button">
              Démarrer la conversation
            </button>
          </div>
        </div>
      </div>
    </>
  );
}