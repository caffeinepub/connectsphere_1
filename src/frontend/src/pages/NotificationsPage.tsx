import { Heart, MessageCircle, UserPlus } from "lucide-react";
import { useEffect, useState } from "react";
import type { AppPage } from "../App";
import {
  type Notification,
  SAMPLE_NOTIFICATIONS,
  formatRelativeTime,
} from "../lib/mockData";

interface NotificationsPageProps {
  navigate: (page: AppPage, params?: Record<string, string>) => void;
}

const NotificationIcon = ({ type }: { type: Notification["type"] }) => {
  if (type === "like")
    return <Heart className="w-3.5 h-3.5 text-red-500 fill-current" />;
  if (type === "follow")
    return <UserPlus className="w-3.5 h-3.5 text-primary" />;
  return <MessageCircle className="w-3.5 h-3.5 text-blue-500" />;
};

export default function NotificationsPage({
  navigate: _navigate,
}: NotificationsPageProps) {
  const [notifications, setNotifications] =
    useState<Notification[]>(SAMPLE_NOTIFICATIONS);

  // Mark all as read when page opens
  useEffect(() => {
    const timer = setTimeout(() => {
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="flex flex-col">
      {unreadCount > 0 && (
        <div className="px-4 py-2 bg-primary/5 border-b border-border">
          <p className="text-xs text-primary font-medium">
            {unreadCount} new notification{unreadCount > 1 ? "s" : ""}
          </p>
        </div>
      )}

      <div className="divide-y divide-border">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`flex items-start gap-3 px-4 py-3.5 transition-colors ${
              !notification.read ? "bg-primary/5" : "hover:bg-muted/30"
            }`}
          >
            {/* Avatar with type icon */}
            <div className="relative shrink-0">
              <img
                src={notification.actorAvatar}
                alt={notification.actorName}
                className="w-11 h-11 rounded-full object-cover"
              />
              <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-background border border-border flex items-center justify-center">
                <NotificationIcon type={notification.type} />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground leading-snug">
                {notification.message}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {formatRelativeTime(notification.timestamp)}
              </p>
            </div>

            {/* Unread dot */}
            {!notification.read && (
              <div className="w-2 h-2 rounded-full gradient-primary shrink-0 mt-2" />
            )}
          </div>
        ))}
      </div>

      {notifications.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center px-6">
          <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center mb-3">
            <span className="text-2xl">🔔</span>
          </div>
          <p className="font-semibold text-foreground mb-1">
            No notifications yet
          </p>
          <p className="text-sm text-muted-foreground">
            When someone interacts with you, it'll show up here
          </p>
        </div>
      )}
    </div>
  );
}
