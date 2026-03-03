// Local mock data for features not yet supported by the backend
// (posts, stories, notifications, chat)

export interface Post {
  id: string;
  authorName: string;
  authorUsername: string;
  authorAvatar: string;
  content: string;
  imageUrl?: string;
  timestamp: Date;
  likes: number;
  comments: number;
  liked: boolean;
  isOwn: boolean;
}

export interface Story {
  id: string;
  authorName: string;
  authorUsername: string;
  authorAvatar: string;
  imageUrl?: string;
  text?: string;
  timestamp: Date;
  isOwn: boolean;
}

export interface Comment {
  id: string;
  authorName: string;
  authorUsername: string;
  authorAvatar: string;
  content: string;
  timestamp: Date;
  isOwn: boolean;
}

export interface Notification {
  id: string;
  type: "follow" | "like" | "comment";
  actorName: string;
  actorAvatar: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  timestamp: Date;
  isOwn: boolean;
}

export interface Conversation {
  id: string;
  participantName: string;
  participantUsername: string;
  participantAvatar: string;
  lastMessage: string;
  lastMessageTime: Date;
  unread: number;
}

export function generateAvatarUrl(seed: string): string {
  const colors = ["8B5CF6", "6366F1", "3B82F6", "EC4899", "10B981", "F59E0B"];
  const color =
    colors[
      Math.abs(seed.charCodeAt(0) + seed.charCodeAt(seed.length - 1)) %
        colors.length
    ];
  const initials = seed.slice(0, 2).toUpperCase();
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=${color}&color=fff&size=128&bold=true`;
}

export const SAMPLE_POSTS: Post[] = [
  {
    id: "1",
    authorName: "Alex Rivera",
    authorUsername: "alexrivera",
    authorAvatar: generateAvatarUrl("Alex Rivera"),
    content:
      "Just launched my new project! 🚀 So excited to share this with the world. ConnectSphere is the future of social networking.",
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    likes: 42,
    comments: 8,
    liked: false,
    isOwn: false,
  },
  {
    id: "2",
    authorName: "Maya Chen",
    authorUsername: "mayachen",
    authorAvatar: generateAvatarUrl("Maya Chen"),
    content:
      "Beautiful sunset from my balcony tonight 🌅 Sometimes you just need to pause and appreciate the little things.",
    imageUrl:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    likes: 128,
    comments: 23,
    liked: true,
    isOwn: false,
  },
  {
    id: "3",
    authorName: "Jordan Kim",
    authorUsername: "jordankim",
    authorAvatar: generateAvatarUrl("Jordan Kim"),
    content:
      "Working on some exciting new designs today. The creative process never gets old! 🎨 #design #creativity",
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
    likes: 67,
    comments: 12,
    liked: false,
    isOwn: false,
  },
  {
    id: "4",
    authorName: "Sam Taylor",
    authorUsername: "samtaylor",
    authorAvatar: generateAvatarUrl("Sam Taylor"),
    content:
      "Coffee + code = perfect morning ☕💻 Building something amazing today. Stay tuned!",
    imageUrl:
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80",
    timestamp: new Date(Date.now() - 1000 * 60 * 180),
    likes: 89,
    comments: 15,
    liked: false,
    isOwn: false,
  },
];

export const SAMPLE_STORIES: Story[] = [
  {
    id: "1",
    authorName: "Alex Rivera",
    authorUsername: "alexrivera",
    authorAvatar: generateAvatarUrl("Alex Rivera"),
    imageUrl:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    isOwn: false,
  },
  {
    id: "2",
    authorName: "Maya Chen",
    authorUsername: "mayachen",
    authorAvatar: generateAvatarUrl("Maya Chen"),
    imageUrl:
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&q=80",
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    isOwn: false,
  },
  {
    id: "3",
    authorName: "Jordan Kim",
    authorUsername: "jordankim",
    authorAvatar: generateAvatarUrl("Jordan Kim"),
    text: "Having the best day! 🌟",
    timestamp: new Date(Date.now() - 1000 * 60 * 90),
    isOwn: false,
  },
  {
    id: "4",
    authorName: "Sam Taylor",
    authorUsername: "samtaylor",
    authorAvatar: generateAvatarUrl("Sam Taylor"),
    imageUrl:
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80",
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
    isOwn: false,
  },
];

export const SAMPLE_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    type: "follow",
    actorName: "Alex Rivera",
    actorAvatar: generateAvatarUrl("Alex Rivera"),
    message: "Alex Rivera started following you",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    read: false,
  },
  {
    id: "2",
    type: "like",
    actorName: "Maya Chen",
    actorAvatar: generateAvatarUrl("Maya Chen"),
    message: "Maya Chen liked your post",
    timestamp: new Date(Date.now() - 1000 * 60 * 20),
    read: false,
  },
  {
    id: "3",
    type: "comment",
    actorName: "Jordan Kim",
    actorAvatar: generateAvatarUrl("Jordan Kim"),
    message: 'Jordan Kim commented on your post: "This is amazing! 🔥"',
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    read: true,
  },
  {
    id: "4",
    type: "like",
    actorName: "Sam Taylor",
    actorAvatar: generateAvatarUrl("Sam Taylor"),
    message: "Sam Taylor liked your photo",
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
    read: true,
  },
];

export const SAMPLE_CONVERSATIONS: Conversation[] = [
  {
    id: "1",
    participantName: "Alex Rivera",
    participantUsername: "alexrivera",
    participantAvatar: generateAvatarUrl("Alex Rivera"),
    lastMessage: "Hey! Loved your latest post 🔥",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 10),
    unread: 2,
  },
  {
    id: "2",
    participantName: "Maya Chen",
    participantUsername: "mayachen",
    participantAvatar: generateAvatarUrl("Maya Chen"),
    lastMessage: "Are you coming to the meetup?",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60),
    unread: 0,
  },
  {
    id: "3",
    participantName: "Jordan Kim",
    participantUsername: "jordankim",
    participantAvatar: generateAvatarUrl("Jordan Kim"),
    lastMessage: "Thanks for the follow!",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 180),
    unread: 0,
  },
];

export const SAMPLE_MESSAGES: Record<string, Message[]> = {
  "1": [
    {
      id: "1",
      senderId: "alex",
      senderName: "Alex Rivera",
      senderAvatar: generateAvatarUrl("Alex Rivera"),
      content: "Hey! How are you doing?",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      isOwn: false,
    },
    {
      id: "2",
      senderId: "me",
      senderName: "You",
      senderAvatar: "",
      content: "Great! Just working on some new stuff 🚀",
      timestamp: new Date(Date.now() - 1000 * 60 * 25),
      isOwn: true,
    },
    {
      id: "3",
      senderId: "alex",
      senderName: "Alex Rivera",
      senderAvatar: generateAvatarUrl("Alex Rivera"),
      content: "Hey! Loved your latest post 🔥",
      timestamp: new Date(Date.now() - 1000 * 60 * 10),
      isOwn: false,
    },
  ],
  "2": [
    {
      id: "1",
      senderId: "maya",
      senderName: "Maya Chen",
      senderAvatar: generateAvatarUrl("Maya Chen"),
      content: "Are you coming to the meetup?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60),
      isOwn: false,
    },
  ],
  "3": [
    {
      id: "1",
      senderId: "jordan",
      senderName: "Jordan Kim",
      senderAvatar: generateAvatarUrl("Jordan Kim"),
      content: "Thanks for the follow!",
      timestamp: new Date(Date.now() - 1000 * 60 * 180),
      isOwn: false,
    },
  ],
};

export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) return "just now";
  if (diffMins < 60) return `${diffMins}m`;
  if (diffHours < 24) return `${diffHours}h`;
  if (diffDays < 7) return `${diffDays}d`;
  return date.toLocaleDateString();
}
