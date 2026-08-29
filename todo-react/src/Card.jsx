import { useState } from 'react';
import { isOverdue } from './todoUtils';

function formatShortDate(dateStr) {
  const [, m, d] = dateStr.split('-');
  return `${m}-${d}`;
}

// タスク1件＝高さ44px（スマホは48px）のピル行。
function Card({ todo, onDelete, onToggle, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.title);

  const overdue = isOverdue(todo);

  function handleSave() {
    if (editValue.trim() === '') {
      setEditValue(todo.title);
    } else {
      onEdit(todo, editValue.trim());
    }
    setIsEditing(false);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') {
      setEditValue(todo.title);
      setIsEditing(false);
    }
  }

  const rowClass = todo.completed
    ? 'bg-accent-2-100 hover:bg-accent-2-200'
    : overdue
      ? 'bg-accent-200 hover:bg-accent-300'
      : 'bg-neutral-100 hover:bg-neutral-200';

  const titleClass = todo.completed
    ? 'text-accent-2-800 line-through'
    : overdue
      ? 'font-semibold text-accent-900'
      : 'font-semibold text-text';

  const dateClass = todo.completed
    ? 'text-accent-2-700'
    : overdue
      ? 'font-bold text-accent-800'
      : 'text-neutral-700';

  return (
    <div
      className={`group flex min-h-[48px] items-center gap-3 rounded-full px-4 transition-colors md:min-h-[44px] ${rowClass}`}
    >
      <button
        type="button"
        onClick={() => onToggle(todo)}
        title={todo.completed ? '未完了に戻す' : '完了にする'}
        className={`flex h-[19px] w-[19px] shrink-0 items-center justify-center rounded-full text-[11px] text-white ${
          todo.completed ? 'bg-accent-2-500' : `border-[2.75px] ${overdue ? 'border-accent-600' : 'border-neutral-400'}`
        }`}
      >
        {todo.completed && '✓'}
      </button>

      {isEditing ? (
        <input
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          autoFocus
          className="min-w-0 flex-1 rounded-full border-2 border-accent-400 bg-white px-2 py-0.5 text-[15px] outline-none"
        />
      ) : (
        <span
          onClick={() => !todo.completed && setIsEditing(true)}
          title={todo.completed ? '' : 'クリックで編集'}
          className={`min-w-0 flex-1 truncate text-[15px] ${titleClass} ${!todo.completed ? 'cursor-pointer' : ''}`}
        >
          {todo.title}
        </span>
      )}

      {todo.due_date && (
        <span className={`shrink-0 text-[12.5px] ${dateClass}`}>{formatShortDate(todo.due_date)}</span>
      )}

      <button
        type="button"
        onClick={() => onDelete(todo)}
        title="削除"
        className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-lg text-[12px] text-neutral-500 opacity-0 transition-opacity hover:bg-accent-100 hover:text-accent-700 group-hover:opacity-100 focus-visible:opacity-100"
      >
        ✕
      </button>
    </div>
  );
}

export default Card;
