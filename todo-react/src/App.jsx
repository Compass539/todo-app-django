import { useState, useEffect } from 'react';
import './App.css';
import TodoForm from './TodoForm';
import Card from './Card';
import Login from './Login';
import Register from './Register';

// カテゴリの定義（アイコン・アクセントカラーも一元管理）
const CATEGORIES = [
  { key: '仕事',        label: '仕事',       icon: '💼', color: 'indigo' },
  { key: 'プライベート', label: 'プライベート', icon: '🏠', color: 'teal'   },
  { key: 'その他',      label: 'その他',      icon: '📦', color: 'amber'  },
  { key: '',            label: 'カテゴリなし', icon: '📋', color: 'gray'   },
];

// カテゴリごとのアクセントカラー（Tailwindクラス）
const COLOR_MAP = {
  indigo: {
    bg:     'bg-indigo-50',
    text:   'text-indigo-600',
    badge:  'bg-indigo-100 text-indigo-700',
    active: 'bg-indigo-50 text-indigo-700 font-semibold',
    bar:    'bg-indigo-500',
  },
  teal: {
    bg:     'bg-teal-50',
    text:   'text-teal-600',
    badge:  'bg-teal-100 text-teal-700',
    active: 'bg-teal-50 text-teal-700 font-semibold',
    bar:    'bg-teal-500',
  },
  amber: {
    bg:     'bg-amber-50',
    text:   'text-amber-600',
    badge:  'bg-amber-100 text-amber-700',
    active: 'bg-amber-50 text-amber-700 font-semibold',
    bar:    'bg-amber-500',
  },
  gray: {
    bg:     'bg-gray-50',
    text:   'text-gray-500',
    badge:  'bg-gray-100 text-gray-600',
    active: 'bg-gray-100 text-gray-700 font-semibold',
    bar:    'bg-gray-400',
  },
};

function App() {
  const [todos,        setTodos]        = useState([]);
  const [searchText,   setSearchText]   = useState('');
  const [isLoading,    setIsLoading]    = useState(true);
  const [token,        setToken]        = useState(null);
  const [showRegister, setShowRegister] = useState(false);
  // 選択中のカテゴリ（サイドバー）
  const [activeKey,    setActiveKey]    = useState('仕事');

  // ログイン後にTodo一覧を取得
  useEffect(() => {
    if (!token) return;
    fetch('http://127.0.0.1:8000/api/todos/', {
      headers: { 'Authorization': `Bearer ${token}` },
    })
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        setTodos(data);
        setIsLoading(false);
      });
  }, [token]);

  // Todo追加
  function addTodo({ title, category, dueDate }) {
    fetch('http://127.0.0.1:8000/api/todos/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ title, category, due_date: dueDate || null }),
    })
      .then((res) => res.json())
      .then((data) => setTodos([...todos, data]));
  }

  // Todo削除
  function deleteTodo(todoToDelete) {
    fetch(`http://127.0.0.1:8000/api/todos/${todoToDelete.id}/`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` },
    }).then(() => setTodos(todos.filter((t) => t !== todoToDelete)));
  }

  // 完了切り替え
  function toggleTodo(todo) {
    fetch(`http://127.0.0.1:8000/api/todos/${todo.id}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ completed: !todo.completed }),
    })
      .then((res) => res.json())
      .then((data) => setTodos(todos.map((t) => (t.id === data.id ? data : t))));
  }

  // タイトル編集
  function editTodo(todo, newTitle) {
    fetch(`http://127.0.0.1:8000/api/todos/${todo.id}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ title: newTitle }),
    })
      .then((res) => res.json())
      .then((data) => setTodos(todos.map((t) => (t.id === data.id ? data : t))));
  }

  // 画面の切り替え
  if (!token && showRegister) {
    return <Register onRegister={() => setShowRegister(false)} />;
  }
  if (!token) {
    return <Login onLogin={setToken} onShowRegister={() => setShowRegister(true)} />;
  }

  // サマリー計算
  const totalCount     = todos.length;
  const completedCount = todos.filter((t) => t.completed).length;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const overdueCount = todos.filter(
    (t) => !t.completed && t.due_date && new Date(t.due_date) < today
  ).length;

  // 選択中カテゴリの情報
  const activeCat   = CATEGORIES.find((c) => c.key === activeKey) || CATEGORIES[0];
  const activeColor = COLOR_MAP[activeCat.color];

  // 表示するTodo（選択カテゴリ＋検索フィルタ）
  const filteredTodos = todos.filter(
    (t) =>
      t.category === activeKey &&
      t.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">

      {/* ========== サイドバー ========== */}
      <aside className="w-56 bg-white border-r border-gray-200 flex flex-col shrink-0">

        {/* アプリ名 + アバター */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
          <span className="text-base font-bold text-gray-800 tracking-tight">TaskBoard</span>
          <div className="w-7 h-7 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-bold">
            U
          </div>
        </div>

        {/* タスク追加ボタン */}
        <div className="px-3 pt-4 pb-2">
          <TodoForm onAdd={addTodo} activeCategory={activeKey} />
        </div>

        {/* 検索欄 */}
        <div className="px-3 pb-3">
          <input
            type="text"
            placeholder="🔍 検索..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full text-sm px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-all"
          />
        </div>

        {/* カテゴリ一覧 */}
        <div className="px-3">
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1 px-1">
            カテゴリ
          </p>
          <nav className="space-y-0.5">
            {CATEGORIES.map(({ key, label, icon, color }) => {
              const isActive = key === activeKey;
              const c        = COLOR_MAP[color];
              const count    = todos.filter((t) => t.category === key).length;
              const hasOverdue = todos.some(
                (t) => t.category === key && !t.completed &&
                       t.due_date && new Date(t.due_date) < today
              );
              return (
                <button
                  key={key}
                  onClick={() => setActiveKey(key)}
                  className={`w-full flex items-center justify-between px-2 py-2 rounded-lg text-sm transition-all ${
                    isActive ? c.active : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {/* アクティブ時の左バー */}
                    {isActive && (
                      <span className={`w-1 h-4 rounded-full ${c.bar}`} />
                    )}
                    <span>{icon} {label}</span>
                  </span>
                  <span
                    className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                      hasOverdue ? 'bg-red-100 text-red-600' : c.badge
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* サマリー */}
        <div className="px-3 mt-4 pt-4 border-t border-gray-100">
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2 px-1">
            サマリー
          </p>
          <div className="space-y-1.5 px-1">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">合計タスク</span>
              <span className="font-semibold text-gray-800">{totalCount}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">完了済み</span>
              <span className="font-semibold text-teal-600">{completedCount}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">期限切れ</span>
              <span className={`font-semibold ${overdueCount > 0 ? 'text-red-500' : 'text-gray-400'}`}>
                {overdueCount}
              </span>
            </div>
          </div>
        </div>

        {/* スペーサー */}
        <div className="flex-1" />

        {/* ログアウト */}
        <div className="px-3 pb-4">
          <button
            onClick={() => setToken(null)}
            className="w-full text-sm text-gray-500 hover:text-red-500 hover:bg-red-50 py-2 rounded-lg transition-colors border border-gray-200"
          >
            ログアウト
          </button>
        </div>
      </aside>

      {/* ========== メインエリア ========== */}
      <main className="flex-1 flex flex-col overflow-hidden">

        {/* メインヘッダー */}
        <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-base">{activeCat.icon}</span>
            <span className="text-sm font-bold text-gray-800">{activeCat.label}</span>
            <span className="text-xs text-gray-400 ml-1">
              {filteredTodos.length}タスク
            </span>
          </div>
          <span className="text-xs text-gray-400">
            未完了 {filteredTodos.filter(t => !t.completed).length} /
            完了 {filteredTodos.filter(t => t.completed).length}
          </span>
        </div>

        {/* タスク一覧 */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {isLoading ? (
            <div className="flex items-center justify-center h-32">
              <p className="text-gray-400 text-sm animate-pulse">読み込み中...</p>
            </div>
          ) : filteredTodos.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-center">
              <p className="text-3xl mb-2">📭</p>
              <p className="text-gray-400 text-sm">タスクがありません</p>
              <p className="text-gray-300 text-xs mt-1">左のボタンから追加してみましょう</p>
            </div>
          ) : (
            <div className="max-w-xl space-y-2">
              {filteredTodos.map((todo) => (
                <Card
                  key={todo.id}
                  todo={todo}
                  accentColor={activeColor}
                  onDelete={deleteTodo}
                  onToggle={toggleTodo}
                  onEdit={editTodo}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
