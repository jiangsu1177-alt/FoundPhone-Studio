import { useState } from "react";
import { ArrowLeft, BadgeCheck, ChevronRight, Ellipsis, Heart, Plus, Search, ShieldCheck, SlidersHorizontal, Users } from "lucide-react";
import type { SkinProps } from "../AppSkins";
import { TinderNavigation } from "./tinder/TinderNavigation";
import chatData from "./tinder/chat-records.json";
import type { TinderChatData, TinderRoute, TinderTab } from "./tinder/types";
import "./tinder/tinder.css";

const records = chatData as TinderChatData;
const photos = ["portrait-a", "portrait-b", "portrait-c", "portrait-d", "portrait-e"];

export function TinderSkin(p: SkinProps) {
  const [route, setRoute] = useState<TinderRoute>("swipe");
  const activeTab: TinderTab = route === "chat-info" || route === "conversation" ? "chats" : route;
  const selectTab = (tab: TinderTab) => {
    if (tab === "explore" || tab === "likes") return;
    setRoute(tab);
  };
  const back = () => setRoute("chats");
  const openChat = () => setRoute("chat-info");

  return (
    <div className="tinder-shell">
      <main className="tinder-page" data-route={route} aria-label={activeTab}>
        {route === "swipe" && <SwipePage onBack={p.onBack} />}
        {route === "chats" && <ChatList onOpenChat={openChat} />}
        {route === "chat-info" && <ChatInfo onBack={back} onOpenConversation={() => setRoute("conversation")} />}
        {route === "conversation" && <Conversation onBack={back} />}
        {route === "profile" && <ProfilePage />}
      </main>
      <TinderNavigation activeTab={activeTab} onSelect={selectTab} />
    </div>
  );
}

function SwipePage({ onBack }: { onBack: () => void }) {
  return <>
    <div className="tinder-discovery-tabs">
      <span className="tinder-filter-icon"><img src={`${import.meta.env.BASE_URL}tinder/filter.svg`} alt="筛选" /></span>
      <span className="tinder-discovery-selected">为你推荐</span><span className="tinder-discovery-film">电影</span><span className="tinder-discovery-art">绘画</span><span className="tinder-discovery-music">音乐</span>
      <span className="tinder-lightning-icon"><img src={`${import.meta.env.BASE_URL}tinder/lightning.svg`} alt="" /></span>
    </div>
    <div className="tinder-paused-title"><span>你已暂停账号⋯⋯</span><span>并且你的个人资料已隐藏</span></div>
    <div className="tinder-paused-description"><span>你无法给新朋友点赞，但当你准备好结识新朋友</span><span>时，你可以随时取消暂停账号。</span></div>
    <button className="tinder-return-button" type="button" onClick={onBack}>返回</button>
  </>;
}

function ChatList({ onOpenChat }: { onOpenChat: () => void }) {
  return <section className="tinder-chat-list">
    <header className="tinder-list-header"><h1>聊天</h1><span><ShieldCheck /><Users /></span></header>
    <h2>新的配对</h2>
    <div className="tinder-matches">
      <button className="tinder-match-card tinder-match-likes" type="button" disabled aria-label="点赞的人"><div className="tinder-avatar tinder-avatar-blur"><Heart fill="currentColor" /></div><b>81</b><small>赞</small></button>
      <button className="tinder-match-card" type="button" onClick={onOpenChat}><div className="tinder-avatar tinder-avatar-x">X</div><b>X</b></button>
    </div>
    <div className="tinder-list-title"><h2>消息</h2><button aria-label="搜索" type="button"><Search /></button></div>
    <div className="tinder-chat-rows">
      <button className="tinder-chat-row" type="button" onClick={onOpenChat}><div className="tinder-avatar tinder-avatar-simon">S</div><span><b>Simon <i>热恋的人</i></b><small>近期活跃，马上配对！</small></span><ChevronRight /></button>
      <button className="tinder-chat-row" type="button" onClick={onOpenChat}><div className="tinder-avatar tinder-avatar-x">X</div><span><b>X</b><small>那先加个v呗 怎么在这上聊多不方便【大笑】</small></span><ChevronRight /></button>
      <button className="tinder-chat-row" type="button" onClick={onOpenChat}><div className="tinder-avatar tinder-avatar-team"><BadgeCheck /></div><span><b>Team Tinder <BadgeCheck /></b><small>大家都想看到你多样的一面哦，快添加更多照片</small></span><ChevronRight /></button>
    </div>
  </section>;
}

function ChatInfo({ onBack, onOpenConversation }: { onBack: () => void; onOpenConversation: () => void }) {
  return <section className="tinder-chat-info">
    <header className="tinder-chat-top"><button onClick={onBack} aria-label="返回"><ArrowLeft /></button><span></span><button aria-label="更多"><Ellipsis /></button></header>
    <div className="tinder-info-label"><div className="tinder-avatar tinder-avatar-x">X</div><b>X</b></div>
    <div className="tinder-match-date"><span>您和X已配对</span><small>昨天</small></div>
    <button type="button" className="tinder-black-circle" aria-label="打开聊天内容" onClick={onOpenConversation}></button>
    <div className="tinder-message-composer"><span>GIF</span><i>键入信息</i><button aria-label="点赞不可用" disabled><Heart /></button></div>
  </section>;
}

function Conversation({ onBack }: { onBack: () => void }) {
  const conversation = records.conversations.find((item) => item.id === "x");
  return <section className="tinder-conversation">
    <header className="tinder-conversation-header"><button onClick={onBack} aria-label="返回"><ArrowLeft /></button><div className="tinder-avatar tinder-avatar-x">X</div><b>X</b><button aria-label="更多"><Ellipsis /></button></header>
    <div className="tinder-conversation-body">
      <p className="tinder-system-match">你已于 2025/9/19 与 X 配对</p>
      {conversation?.messages.map((message) => message.type === "time" ? <div className="tinder-time-separator" key={message.id}>{message.time}</div> : <div className={`tinder-message tinder-message--${message.sender}`} key={message.id}>{message.type === "emoji" ? <span className="tinder-message-emoji">{message.text}</span> : <><p>{message.text}</p>{message.sender === "match" && message.id === "m1" && <small>双击点赞❤️</small>}</>}</div>)}
    </div>
    <div className="tinder-message-composer"><span>GIF</span><i>键入信息</i><button aria-label="点赞不可用" disabled><Heart /></button></div>
  </section>;
}

function ProfilePage() {
  return <section className="tinder-profile-page">
    <header className="tinder-profile-header"><div className="tinder-profile-photo tinder-profile-portrait">S</div><span><b>Steven</b><small>预览 ›</small></span><button aria-label="验证资料"><BadgeCheck /></button><button aria-label="设置"><SlidersHorizontal /></button></header>
    <div className="tinder-profile-scroll">
      <div className="tinder-profile-prompt">请将您的个人资料填写完整</div>
      <div className="tinder-profile-chips"><span>⌂ 北京</span><span>◇ 180 cm</span><span>▣ 工作 +</span><span>♧ 教育 +</span><span>性别</span></div>
      <div className="tinder-profile-chips secondary"><span>基本信息 (1/5)</span><span>生活方式 (4/5)</span><span>我还在想</span><span>♡ 星座</span></div>
      <h2>我的照片</h2>
      <div className="tinder-photo-strip">{photos.map((photo, i) => <div className={`tinder-profile-image ${photo}`} key={photo}><span>{["S","S","S","S","S"][i]}</span></div>)}</div>
      <div className="tinder-profile-photo-note">上传六张照片，至少可获双倍赞。 <button>编辑</button></div>
      <h2>我的“关于我”</h2>
      <div className="tinder-about-cards"><div><Plus /><small>个人简介</small></div><div><Plus /><small>选择一条照片配文</small></div></div>
      <h2>我的兴趣</h2>
      <div className="tinder-interest-tags"><span>☕ 咖啡</span><span>🎵 音乐</span><span>✈ 旅行</span><span>🎬 电影</span></div>
      <h2>我的生活方式</h2><div className="tinder-profile-prompt">添加更多资料，让大家更了解你</div>
    </div>
  </section>;
}
