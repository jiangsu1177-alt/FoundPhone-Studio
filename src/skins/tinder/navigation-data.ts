import type { TinderTab } from "./types";

export const tabDefinitions: {
  id: TinderTab;
  label: string;
  icon: string;
}[] = [
  { id: "swipe", label: "滑动", icon: "tab-swipe.svg" },
  { id: "explore", label: "探索", icon: "tab-explore.svg" },
  { id: "likes", label: "赞", icon: "tab-likes.svg" },
  { id: "chats", label: "聊天", icon: "tab-chats.svg" },
  { id: "profile", label: "个人资料", icon: "tab-profile.svg" },
];
