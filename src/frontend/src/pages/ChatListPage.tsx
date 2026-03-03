import { MessageCircle, Search } from "lucide-react";
import type { AppPage } from "../App";
import { SAMPLE_CONVERSATIONS, formatRelativeTime } from "../lib/mockData";

interface ChatListPageProps {
  navigate: (page: AppPage, params?: Record<string, string>) => void;
}

export default function ChatListPage({ navigate }: ChatListPageProps) {
  const conversations = SAMPLE_CONVERSATIONS;

  return (
    <div className="flex flex-col">
      {/* Search Bar */}
      <div className="px-4 py-3 border-b border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search messages..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground text-sm transition-all"
          />
        </div>
      </div>

      {/* Conversations */}
      <div className="divide-y divide-border">
        {conversations.map((conv) => (
          <button
            type="button"
            key={conv.id}
            onClick={() => navigate("chat-thread", { conversationId: conv.id })}
            className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-muted/30 transition-colors text-left"
          >
            <div className="relative shrink-0">
              <img
                src={conv.participantAvatar}
                alt={conv.participantName}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-background" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <p className="font-semibold text-sm text-foreground">
                  {conv.participantName}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatRelativeTime(conv.lastMessageTime)}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground truncate">
                  {conv.lastMessage}
                </p>
                {conv.unread > 0 && (
                  <span className="ml-2 min-w-[20px] h-5 rounded-full gradient-primary text-white text-[10px] font-bold flex items-center justify-center px-1.5 shrink-0">
                    {conv.unread}
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      {conversations.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center px-6">
          <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center mb-3">
            <MessageCircle className="w-6 h-6 text-muted-foreground" />
          </div>
          <p className="font-semibold text-foreground mb-1">No messages yet</p>
          <p className="text-sm text-muted-foreground">
            Start a conversation with someone!
          </p>
        </div>
      )}
    </div>
  );
}
