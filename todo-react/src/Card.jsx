import { useState } from 'react';

function Card({ todo, onDelete, onToggle, onEdit, accentColor }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.title);

  // 期限切れ判定
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due       = todo.due_date ? new Date(todo.due_date) : null;
  const isOverdue = due && due < today && !todo.completed;

  // 編集を保存
  function handleSave() {
    if (editValue.trim() === '') {
      setEditValue(todo.title);
    } else {
      onEdit(todo, editValue.trim());
    }
    setIsEditing(false);
  }

  // キーボード操作
  function handleKeyDown(e) {
    if (e.key === 'Enter')  handleSave();
    if (e.key === 'Escape') {
      setEditValue(todo.title);
      setIsEditing(false);
    }
  }

  // カードの左アクセントバーの色
  const barColor = accentColor?.bar || 'bg-indigo-500';

  return (
    <div
      className={`group relative bg-white rounded-xl border shadow-sm
        hover:shadow-md hover:-translate-y-0.5 transition-all duration-200
        ${todo.completed ? 'opacity-60 bg-gray-50' : 'border-gray-200'}
        ${isOverdue ? 'border-red-200' : ''}
      `}
    >
      {/* 左アクセントバー */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-1.5 rounded-l-xl ${
          isOverdue ? 'bg-red-400' : barColor
        }`}
      />

      <div className="pl-5 pr-3 py-3.5">
        <div className="flex items-center gap-3">

          {/* チェックボックス */}
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo)}
            className="accent-indigo-500 w-4 h-4 shrink-0 cursor-pointer"
          />

          {/* タイトル（通常 or 編集モード） */}
          {isEditing ? (
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onBlur={handleSave}
              onKeyDown={handleKeyDown}
              autoFocus
              className="flex-1 text-sm font-medium px-2 py-0.5 border border-indigo-400
                rounded-lg outline-none ring-2 ring-indigo-100"
            />
          ) : (
            <span
              onClick={() => !todo.completed && setIsEditing(true)}
              title={todo.completed ? '' : 'クリックで編集'}
              className={`flex-1 text-left text-sm font-medium cursor-pointer ${
                todo.completed
                  ? 'line-through text-gray-400'
                  : 'text-gray-800 hover:text-indigo-600 transition-colors'
              }`}
            >
              {todo.title}
            </span>
          )}

          {/* 削除ボタン（ホバー時に表示） */}
          <button
            onClick={() => onDelete(todo)}
            className="opacity-0 group-hover:opacity-100 text-gray-300
              hover:text-red-500 hover:bg-red-50 text-xs w-6 h-6 rounded-lg
              flex items-center justify-center transition-all duration-150 shrink-0"
          >
            ✕
          </button>
        </div>

        {/* 期限日バッジ */}
        {todo.due_date && (
          <div className="mt-2 ml-7 flex justify-start">
            <span
              className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
                isOverdue
                  ? 'bg-red-100 text-red-600'
                  : 'bg-indigo-50 text-indigo-500'
              }`}
            >
              📅 {todo.due_date}
              {isOverdue && <span className="ml-0.5">⚠️</span>}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Card;
