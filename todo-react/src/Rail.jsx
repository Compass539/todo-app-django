// 左レール（デスクトップ）／ 下部タブバー（スマホ）。
// カテゴリ切替・カレンダー表示切替・ログアウト（アバターのクリック）を担う。

function NavCircle({ size, active, activeClass, inactiveClass, title, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`flex shrink-0 items-center justify-center rounded-full transition-colors ${size} ${
        active ? activeClass : inactiveClass
      }`}
    >
      {children}
    </button>
  );
}

export function Rail({ categories, activeKey, view, onSelectCategory, onSelectCalendar, onLogout }) {
  return (
    <aside className="hidden w-[80px] shrink-0 flex-col items-center gap-3 bg-accent-800 py-4 md:flex">
      <div
        title="TaskBoard"
        className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full bg-accent-400 font-heading text-[19px] text-accent-900"
      >
        T
      </div>

      {categories.map(({ key, label, icon }) => (
        <NavCircle
          key={key || 'none'}
          size="h-[44px] w-[44px] text-[19px]"
          active={view === 'list' && key === activeKey}
          activeClass="bg-accent-100"
          inactiveClass="bg-white/12 hover:bg-white/20"
          title={label}
          onClick={() => onSelectCategory(key)}
        >
          {icon}
        </NavCircle>
      ))}

      <NavCircle
        size="h-[44px] w-[44px] text-[19px]"
        active={view === 'calendar'}
        activeClass="bg-accent-100"
        inactiveClass="bg-white/12 hover:bg-white/20"
        title="カレンダー"
        onClick={onSelectCalendar}
      >
        📅
      </NavCircle>

      <div className="flex-1" />

      <button
        type="button"
        onClick={onLogout}
        title="ログアウト"
        className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full bg-accent-2-500 text-[14px] font-bold text-white"
      >
        U
      </button>
    </aside>
  );
}

export function MobileTabBar({ categories, activeKey, view, onSelectCategory, onSelectCalendar, onAddClick, onLogout }) {
  return (
    <nav className="flex items-center justify-between gap-1 bg-surface px-4 pb-6 pt-3 md:hidden">
      {categories.map(({ key, label, icon }) => (
        <NavCircle
          key={key || 'none'}
          size="h-[48px] w-[48px] text-[18px]"
          active={view === 'list' && key === activeKey}
          activeClass="bg-accent-200"
          inactiveClass=""
          title={label}
          onClick={() => onSelectCategory(key)}
        >
          {icon}
        </NavCircle>
      ))}

      <NavCircle
        size="h-[48px] w-[48px] text-[18px]"
        active={view === 'calendar'}
        activeClass="bg-accent-200"
        inactiveClass=""
        title="カレンダー"
        onClick={onSelectCalendar}
      >
        📅
      </NavCircle>

      <button
        type="button"
        onClick={onLogout}
        title="ログアウト"
        className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-full text-[14px] font-bold text-white"
      >
        <span className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-accent-2-500">U</span>
      </button>

      <button
        type="button"
        onClick={onAddClick}
        title="タスクを追加"
        className="flex h-[56px] w-[56px] shrink-0 items-center justify-center rounded-full bg-accent-500 text-[26px] text-white shadow-md"
      >
        ＋
      </button>
    </nav>
  );
}
