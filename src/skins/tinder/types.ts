export type TinderTab = "swipe" | "explore" | "likes" | "chats" | "profile";
export type TinderRoute = TinderTab | "chat-info" | "conversation";

export type TinderMessage = {
  id: string;
  sender: "match" | "me";
  type: "text" | "emoji";
  text: string;
  time: string;
};

export type TinderTimeSeparator = {
  id: string;
  type: "time";
  time: string;
};

export type TinderChatRecord = TinderMessage | TinderTimeSeparator;

export type TinderConversation = {
  id: string;
  contactName: string;
  avatar?: string;
  messages: TinderChatRecord[];
};

export type TinderChatData = {
  formatVersion: 1;
  conversations: TinderConversation[];
};
