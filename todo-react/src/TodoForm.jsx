import { useState } from 'react';
import { CATEGORIES } from './categories';
import { btnPrimaryClass, tagAccentClass, tagOutlineClass, tagNeutralClass } from './ui';

// 一覧最上部に1行で開くタスク追加フォーム。開閉は App.jsx 側で管理する。
function TodoForm({ onAdd, onClose, activeCategory }) {
  const [inputValue, setInputValue] = useState('');
  const [category, setCategory] = useState(activeCategory || '');
  const [dueDate, setDueDate] = useState('');

  function handleSubmit() {
    if (inputValue.trim() === '') return;
    onAdd({ title: inputValue.trim(), category, dueDate });
    setInputValue('');
    setCategory(activeCategory || '');
    setDueDate('');
    onClose();
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleSubmit();
    if (e.key === 'Escape') onClose();
  }

  return (
    <div
      className="flex min-h-[44px] flex-wrap items-center gap-3 rounded-lg border-2 border-accent-400 bg-neutral-100 px-4 py-2 shadow-md"
      onKeyDown={handleKeyDown}
    >
      <span className="h-[19px] w-[19px] shrink-0 rounded-full border-[2.75px] border-neutral-400" />

      <input
        type="text"
        placeholder="タスク名を入力…"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        autoFocus
        className="min-w-[180px] flex-1 bg-transparent text-[15px] text-text outline-none placeholder:text-neutral-600"
      />

      <div className="flex flex-wrap items-center gap-1.5">
        {CATEGORIES.map(({ key, label, icon }) => (
          <button
            key={key || 'none'}
            type="button"
            onClick={() => setCategory(key)}
            className={key === category ? tagAccentClass : tagOutlineClass}
          >
            {icon} {label}
          </button>
        ))}
      </div>

      <label className={`${tagNeutralClass} cursor-pointer`}>
        📅
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-[86px] cursor-pointer bg-transparent outline-none"
        />
      </label>

      <button type="button" onClick={handleSubmit} className={btnPrimaryClass}>
        追加
      </button>
    </div>
  );
}

export default TodoForm;
