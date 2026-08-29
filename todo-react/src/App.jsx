import { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import Card from './Card';
import { isOverdue } from './todoUtils';
import Login from './Login';
import Register from './Register';
import { Rail, MobileTabBar } from './Rail';
import SummaryPanel from './SummaryPanel';
import CalendarView from './CalendarView';
import { CATEGORIES } from './categories';
import { inputClass, btnPrimaryClass } from './ui';

function sortByDueDate(list) {
  return [...list].sort((a, b) => {
    if (!a.due_date) return 1;
    if (!b.due_date) return -1;
    return a.due_date.localeCompare(b.due_date);
  });
}

function App() {
  const [todos,        setTodos]        = useState([]);
  const [searchText,   setSearchText]   = useState('');
  const [isLoading,    setIsLoading]    = useState(true);
  const [token,        setToken]        = useState(null);
  const [showRegister, setShowRegister] = useState(false);
  // 選択中のカテゴリ（レール）
  const [activeKey,    setActiveKey]    = useState('仕事');
  // タスク追加フォームの開閉（一覧最上部に1行で開く）
  const [isAdding,     setIsAdding]     = useState(false);
  // 表示中の画面：一覧 or カレンダー
  const [view,          setView]          = useState('list');
  const [calendarMonth, setCalendarMonth] = useState(() => new Date());
  const [selectedDate,  setSelectedDate]  = useState(() => new Date());

  // ログイン後にTodo一覧を取得
  useEffect(() => {
    if (!token) return;
    fetch('https://todo-app-django-sjp6.onrender.com/api/todos/', {
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
    fetch('https://todo-app-django-sjp6.onrender.com/api/todos/', {
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
    fetch(`https://todo-app-django-sjp6.onrender.com/api/todos/${todoToDelete.id}/`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` },
    }).then(() => setTodos(todos.filter((t) => t !== todoToDelete)));
  }

  // 完了切り替え
  function toggleTodo(todo) {
    fetch(`https://todo-app-django-sjp6.onrender.com/api/todos/${todo.id}/`, {
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
    fetch(`https://todo-app-django-sjp6.onrender.com/api/todos/${todo.id}/`, {
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

  // グローバルなサマリー（全カテゴリ横断）
  const totalCount     = todos.length;
  const completedCount = todos.filter((t) => t.completed).length;
  const overdueCount   = todos.filter(isOverdue).length;

  // 選択中カテゴリの情報
  const activeCat = CATEGORIES.find((c) => c.key === activeKey) || CATEGORIES[0];

  // 表示するTodo（選択カテゴリ＋検索フィルタ）
  const filteredTodos = todos.filter(
    (t) =>
      t.category === activeKey &&
      t.title.toLowerCase().includes(searchText.toLowerCase())
  );
  const overdueTodos   = sortByDueDate(filteredTodos.filter((t) => isOverdue(t)));
  const upcomingTodos  = sortByDueDate(filteredTodos.filter((t) => !t.completed && !isOverdue(t)));
  const completedTodos = sortByDueDate(filteredTodos.filter((t) => t.completed));

  function openAddForm() {
    setView('list');
    setIsAdding(true);
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-bg font-body md:flex-row">
      <Rail
        categories={CATEGORIES}
        activeKey={activeKey}
        view={view}
        onSelectCategory={(key) => {
          setActiveKey(key);
          setView('list');
        }}
        onSelectCalendar={() => setView('calendar')}
        onLogout={() => setToken(null)}
      />

      {view === 'calendar' ? (
        <CalendarView
          todos={todos}
          calendarMonth={calendarMonth}
          onChangeMonth={setCalendarMonth}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
          onToggle={toggleTodo}
          onAddClick={openAddForm}
        />
      ) : (
        <main className="flex min-w-0 flex-1 flex-col overflow-hidden px-4 pt-4 md:px-6 md:pt-6">
          <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="m-0 font-heading text-[28px] leading-none text-text md:text-[32px]">
                {activeCat.icon} {activeCat.label}
              </h1>
              <p className="m-0 mt-1 text-[13px] text-neutral-700">
                {filteredTodos.length}タスク · 未完了 {filteredTodos.filter((t) => !t.completed).length} ·
                完了 {filteredTodos.filter((t) => t.completed).length}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="検索…"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className={`${inputClass} w-full py-[11px] md:w-[180px] md:py-2`}
              />
              <button type="button" onClick={openAddForm} className={`${btnPrimaryClass} hidden shrink-0 md:inline-flex`}>
                ＋ タスクを追加
              </button>
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-4 overflow-hidden md:flex-row md:gap-6">
            <div className="flex min-w-0 flex-1 flex-col gap-2 overflow-y-auto pb-4 md:max-w-[620px]">
              {isAdding && (
                <TodoForm
                  onAdd={addTodo}
                  onClose={() => setIsAdding(false)}
                  activeCategory={activeKey}
                />
              )}

              {isLoading ? (
                <div className="flex flex-col gap-2 pt-1">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="h-[44px] animate-pulse rounded-full bg-neutral-200" />
                  ))}
                </div>
              ) : filteredTodos.length === 0 && !isAdding ? (
                <div className="flex flex-col items-center justify-center gap-1 py-16 text-center">
                  <p className="m-0 text-[15px] text-neutral-700">タスクがありません</p>
                  <p className="m-0 text-[13px] text-neutral-600">右上のボタンから追加してみましょう</p>
                </div>
              ) : (
                <>
                  {overdueTodos.length > 0 && (
                    <>
                      <p className="m-0 mb-1 mt-3 text-[11.5px] font-bold uppercase tracking-[.09em] text-accent-700">
                        期限切れ · {overdueTodos.length}
                      </p>
                      {overdueTodos.map((todo) => (
                        <Card key={todo.id} todo={todo} onDelete={deleteTodo} onToggle={toggleTodo} onEdit={editTodo} />
                      ))}
                    </>
                  )}

                  {upcomingTodos.length > 0 && (
                    <>
                      <p className="m-0 mb-1 mt-3 text-[11.5px] font-bold uppercase tracking-[.09em] text-neutral-600">
                        今週 · {upcomingTodos.length}
                      </p>
                      {upcomingTodos.map((todo) => (
                        <Card key={todo.id} todo={todo} onDelete={deleteTodo} onToggle={toggleTodo} onEdit={editTodo} />
                      ))}
                    </>
                  )}

                  {completedTodos.length > 0 && (
                    <>
                      <p className="m-0 mb-1 mt-3 text-[11.5px] font-bold uppercase tracking-[.09em] text-accent-2-700">
                        完了 · {completedTodos.length}
                      </p>
                      {completedTodos.map((todo) => (
                        <Card key={todo.id} todo={todo} onDelete={deleteTodo} onToggle={toggleTodo} onEdit={editTodo} />
                      ))}
                    </>
                  )}
                </>
              )}
            </div>

            <div className="overflow-y-auto pb-4 md:pb-0">
              <SummaryPanel totalCount={totalCount} completedCount={completedCount} overdueCount={overdueCount} />
            </div>
          </div>
        </main>
      )}

      <MobileTabBar
        categories={CATEGORIES}
        activeKey={activeKey}
        view={view}
        onSelectCategory={(key) => {
          setActiveKey(key);
          setView('list');
        }}
        onSelectCalendar={() => setView('calendar')}
        onAddClick={openAddForm}
        onLogout={() => setToken(null)}
      />
    </div>
  );
}

export default App;
