import { useState } from 'react';

function TodoForm({ onAdd }) {
  const [inputValue, setInputValue] = useState('');
  const [category, setCategory] = useState('');
  const [dueDate, setDueDate] = useState('');

  function handleAdd() {
    if (inputValue === '') return;
    onAdd({ title: inputValue, category, dueDate });
    setInputValue('');
    setCategory('');
    setDueDate('');
  }

  const inputStyle =
    'px-3 py-2 rounded-lg border-1.5 border-gray-300 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors';

  return (
    <div className="flex gap-2 justify-center items-center flex-wrap mb-8">
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className={inputStyle}
      >
        <option value="">カテゴリなし</option>
        <option value="仕事">仕事</option>
        <option value="プライベート">プライベート</option>
        <option value="その他">その他</option>
      </select>

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className={inputStyle}
      />

      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Todoを入力..."
        className={`${inputStyle} w-52`}
      />

      <button
        onClick={handleAdd}
        className="px-5 py-2 bg-gradient-to-br from-indigo-500 to-purple-500 text-white text-sm font-semibold rounded-lg hover:opacity-90 hover:-translate-y-0.5 transition-all"
      >
        追加
      </button>
    </div>
  );
}

export default TodoForm;