import { tabDefinitions } from "./navigation-data";
import type { TinderTab } from "./types";

export function TinderNavigation({
  activeTab,
  onSelect,
}: {
  activeTab: TinderTab;
  onSelect: (tab: TinderTab) => void;
}) {
  return (
    <nav className="tinder-bottom-nav" aria-label="Tinder 主导航">
      <span
        className={`tinder-nav-highlight tinder-nav-highlight--${activeTab}`}
        aria-hidden="true"
      />
      <img
        className="tinder-nav-divider"
        src={`${import.meta.env.BASE_URL}tinder/nav-divider.svg`}
        alt=""
      />
      {tabDefinitions.map(({ id, label, icon }) => {
        const disabled = id === "explore" || id === "likes";
        return (
          <button
            className="tinder-nav-item"
            type="button"
            key={id}
            disabled={disabled}
            aria-label={label}
            aria-current={activeTab === id ? "page" : undefined}
            onClick={() => onSelect(id)}
          >
            <img
              className={`tinder-nav-icon tinder-nav-icon--${id}`}
              aria-hidden="true"
              src={`${import.meta.env.BASE_URL}tinder/${icon}`}
              alt=""
            />
            <span>{label}</span>
          </button>
        );
      })}
      <span className="tinder-nav-badge" aria-label="81 条未读消息">
        81
      </span>
    </nav>
  );
}
