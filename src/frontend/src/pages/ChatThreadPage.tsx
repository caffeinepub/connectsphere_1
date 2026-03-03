import { Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { AppPage } from "../App";
import { useGetCallerUserProfile } from "../hooks/useQueries";
import {
  type Message,
  SAMPLE_CONVERSATIONS,
  SAMPLE_MESSAGES,
  formatRelativeTime,
  generateAvatarUrl,
} from "../lib/mockData";

interface ChatThreadPageProps {
  navigate: (page: AppPage, params?: Record<string, string>) => void;
  conversationId: string;
}

export default function ChatThreadPage({
  conversationId,
}: ChatThreadPageProps) {
  const conversation =
    SAMPLE_CONVERSATIONS.find((c) => c.id === conversationId) ||
    SAMPLE_CONVERSATIONS[0];
  const [messages, setMessages] = useState<Message[]>(
    SAMPLE_MESSAGES[conversationId] || SAMPLE_MESSAGES["1"],
  );
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { data: userProfile } = useGetCallerUserProfile();

  const myAvatar =
    userProfile?.avatar || generateAvatarUrl(userProfile?.displayName || "You");

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Polling simulation
  useEffect(() => {
    const interval = setInterval(() => {
      // In a real app, this would fetch new messages from the backend
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSend = () => {
    if (!newMessage.trim()) return;
    const msg: Message = {
      id: Date.now().toString(),
      senderId: "me",
      senderName: userProfile?.displayName || "You",
      senderAvatar: myAvatar,
      content: newMessage.trim(),
      timestamp: new Date(),
      isOwn: true,
    };
    setMessages((prev) => [...prev, msg]);
    setNewMessage("");
  };

  return (
    <div className="flex flex-col h-[calc(100vh-7rem)]">
      {/* Participant Info */}
      <div className="px-4 py-2 border-b border-border flex items-center gap-3 bg-background">
        <img
          src={conversation.participantAvatar}
          alt={conversation.participantName}
          className="w-8 h-8 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold text-sm text-foreground">
            {conversation.participantName}
          </p>
          <p className="text-xs text-green-500">Online</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-end gap-2 ${msg.isOwn ? "flex-row-reverse" : "flex-row"}`}
          >
            {!msg.isOwn && (
              <img
                src={msg.senderAvatar}
                alt={msg.senderName}
                className="w-7 h-7 rounded-full object-cover shrink-0"
              />
            )}
            {msg.isOwn && (
              <img
                src={myAvatar}
                alt="You"
                className="w-7 h-7 rounded-full object-cover shrink-0"
              />
            )}
            <div
              className={`max-w-[70%] ${msg.isOwn ? "items-end" : "items-start"} flex flex-col gap-0.5`}
            >
              <div
                className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  msg.isOwn
                    ? "gradient-primary text-white rounded-br-sm"
                    : "bg-muted text-foreground rounded-bl-sm"
                }`}
              >
                {msg.content}
              </div>
              <p className="text-[10px] text-muted-foreground px-1">
                {formatRelativeTime(msg.timestamp)}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-border px-4 py-3 flex items-center gap-3 bg-background">
        <div className="flex-1 flex items-center gap-2 bg-muted rounded-full px-4 py-2.5">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Message..."
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
        </div>
        <button
          type="button"
          onClick={handleSend}
          disabled={!newMessage.trim()}
          className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center disabled:opacity-40 transition-all active:scale-90 shadow-glow"
        >
          <Send className="w-4 h-4 text-white" />
        </button>
      </div>
    </div>
  );
}
