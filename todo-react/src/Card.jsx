import { useState } from 'react';

function Card({ todo, onDelete, onToggle, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.title);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = todo.due_date ? new Date(todo.due_date) : null;
  const isOverdue = due && due < today && !todo.completed;

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

  return (
    <div
      className={`bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all p-3 mb-2.5 ${
        todo.completed ? 'opacity-55 bg-gray-50' : ''
      }`}
    >
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo)}
          className="accent-indigo-500 w-4 h-4"
        />

        {isEditing ? (
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            autoFocus
            className="flex-1 text-sm font-medium px-1.5 py-0.5 border-1.5 border-indigo-500 rounded-md outline-none ring-2 ring-indigo-200"
          />
        ) : (
          <span
            onClick={() => !todo.completed && setIsEditing(true)}
            title={todo.completed ? '' : 'クリックで編集'}
            className={`flex-1 text-sm font-medium text-gray-800 cursor-pointer ${
              todo.completed ? 'line-through text-gray-400' : ''
            }`}
          >
            {todo.title}
          </span>
        )}

        <button
          onClick={() => onDelete(todo)}
          className="text-gray-300 hover:text-red-500 hover:bg-red-100 text-sm px-1 rounded transition-colors"
        >
          ✕
        </button>
      </div>

      {todo.due_date && (
        <div className="mt-2 pt-1.5 border-t border-gray-100">
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-full ${
              isOverdue
                ? 'bg-red-100 text-red-500'
                : 'bg-indigo-50 text-indigo-500'
            }`}
          >
            📅 {todo.due_date}
          </span>
        </div>
      )}
    </div>
  );
}

export default Card;