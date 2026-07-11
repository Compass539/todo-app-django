import { useState } from 'react';

// カテゴリ選択肢
const CATEGORY_OPTIONS = [
  { value: '仕事',        label: '💼 仕事' },
  { value: 'プライベート', label: '🏠 プライベート' },
  { value: 'その他',      label: '📦 その他' },
  { value: '',            label: '📋 カテゴリなし' },
];

function TodoForm({ onAdd, activeCategory }) {
  const [isOpen,     setIsOpen]     = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [category,   setCategory]   = useState(activeCategory || '');
  const [dueDate,    setDueDate]    = useState('');

  // フォームを開くとき、選択中カテゴリをデフォルトにセット
  function handleOpen() {
    setCategory(activeCategory || '');
    setIsOpen(true);
  }

  // 送信処理
  function handleSubmit() {
    if (inputValue.trim() === '') return;
    onAdd({ title: inputValue.trim(), category, dueDate });
    setInputValue('');
    setCategory(activeCategory || '');
    setDueDate('');
    setIsOpen(false);
  }

  // キーボード操作
  function handleKeyDown(e) {
    if (e.key === 'Enter')  handleSubmit();
    if (e.key === 'Escape') setIsOpen(false);
  }

  // ボタンだけ表示（折りたたみ時）
  if (!isOpen) {
    return (
      <button
        onClick={handleOpen}
        className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg
          bg-indigo-500 hover:bg-indigo-600 active:scale-95
          text-white text-sm font-semibold transition-all duration-150 shadow-sm"
      >
        <span className="text-base leading-none">＋</span>
        <span>タスクを追加</span>
      </button>
    );
  }

  // フォーム展開時
  return (
    <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-3 space-y-2">

      {/* タイトル入力 */}
      <input
        type="text"
        placeholder="タスク名を入力..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        autoFocus
        className="w-full text-sm px-3 py-1.5 rounded-lg border border-indigo-200 bg-white
          outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-all"
      />

      {/* カテゴリ選択 */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full text-sm px-2 py-1.5 rounded-lg border border-indigo-200 bg-white
          outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-all"
      >
        {CATEGORY_OPTIONS.map(({ value, label }) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>

      {/* 期限日 */}
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="w-full text-sm px-2 py-1.5 rounded-lg border border-indigo-200 bg-white
          outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-all"
      />

      {/* ボタン群 */}
      <div className="flex gap-2">
        <button
          onClick={handleSubmit}
          className="flex-1 py-1.5 rounded-lg bg-indigo-500 hover:bg-indigo-600
            text-white text-sm font-semibold transition-colors"
        >
          追加
        </button>
        <button
          onClick={() => setIsOpen(false)}
          className="flex-1 py-1.5 rounded-lg border border-indigo-200 bg-white
            text-indigo-500 text-sm font-medium hover:bg-indigo-50 transition-colors"
        >
          キャンセル
        </button>
      </div>
    </div>
  );
}

export default TodoForm;
