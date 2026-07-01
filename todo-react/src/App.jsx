import { useState, useEffect } from 'react';
import './App.css';
import TodoForm from './TodoForm';
import Column from './Column';



// カテゴリの定義（表示順・ラベルを一元管理）
const CATEGORIES = [
  { key: '仕事',       label: '仕事' },
  { key: 'プライベート', label: 'プライベート' },
  { key: 'その他',     label: 'その他' },
  { key: '',           label: 'カテゴリなし' },
];

function App() {
  const [todos, setTodos] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // 初回マウント時にTodo一覧を取得
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/todos/')
      .then((res) => res.json())
      .then((data) => {
        setTodos(data);
        setIsLoading(false);
      });
  }, []);

  // TodoFormから受け取ったデータでPOSTリクエスト
  function addTodo({ title, category, dueDate }) {
    fetch('http://127.0.0.1:8000/api/todos/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        category,
        due_date: dueDate || null,
      }),
    })
      .then((res) => res.json())
      .then((data) => setTodos([...todos, data]));
  }

  function deleteTodo(todoToDelete) {
    fetch(`http://127.0.0.1:8000/api/todos/${todoToDelete.id}/`, {
      method: 'DELETE',
    }).then(() => {
      setTodos(todos.filter((t) => t !== todoToDelete));
    });
  }

  function toggleTodo(todo) {
    fetch(`http://127.0.0.1:8000/api/todos/${todo.id}/`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !todo.completed }),
    })
      .then((res) => res.json())
      .then((data) => {
        setTodos(todos.map((t) => (t.id === data.id ? data : t)));
      });
  }

  function editTodo(todo, newTitle) {
  fetch(`http://127.0.0.1:8000/api/todos/${todo.id}/`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: newTitle }),
  })
    .then((res) => res.json())
    .then((data) => {
      setTodos(todos.map((t) => (t.id === data.id ? data : t)));
    });
}


 return (
  <div>
    <h1>Todoリスト</h1>

    <TodoForm onAdd={addTodo} />

    <input
      type="text"
      placeholder="🔍 Todoを検索..."
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
      className="block mx-auto mb-6 w-70 px-4 py-2 rounded-full border-1.5 border-gray-300 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors"
    />

    {isLoading ? (
      <p className="text-gray-400 text-sm">読み込み中...</p>
    ) : (
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-start px-4 pb-8">
        {CATEGORIES.map(({ key, label }) => (
          <Column
            key={key}
            title={label}
            todos={todos.filter(
              (t) =>
                t.category === key &&
                t.title.toLowerCase().includes(searchText.toLowerCase())
            )}
            onDelete={deleteTodo}
            onToggle={toggleTodo}
            onEdit={editTodo}
          />
        ))}
      </div>
    )}
  </div>
);}

export default App;