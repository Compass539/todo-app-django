import { useState } from 'react';

function Login({ onLogin, onShowRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);

  async function handleLogin() {
    if (!username || !password) {
      setError('ユーザー名とパスワードを入力してください');
      return;
    }
    setLoading(true);
    const response = await fetch('todo-app-django-sjp6.onrender.com/api/token/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    setLoading(false);

    if (response.ok) {
      const data = await response.json();
      onLogin(data.access);
    } else {
      setError('ユーザー名またはパスワードが間違っています');
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleLogin();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-violet-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        {/* ロゴ・タイトル */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-500 rounded-2xl mb-4 shadow-md">
            <span className="text-white text-xl">✓</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">TaskBoard</h1>
          <p className="text-sm text-gray-500 mt-1">タスクをスマートに管理しよう</p>
        </div>

        {/* カード */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-base font-semibold text-gray-700 mb-5">ログイン</h2>

          {/* エラー */}
          {error && (
            <div className="mb-4 px-3 py-2 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-xs text-red-600">{error}</p>
            </div>
          )}

          {/* ユーザー名 */}
          <div className="mb-4">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-1.5">
              <span className="w-0.5 h-4 bg-indigo-500 rounded-full" />
              ユーザー名
            </label>
            <input
              type="text"
              placeholder="ユーザー名を入力"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full text-sm px-3 py-2.5 rounded-lg border border-gray-200
                outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400
                transition-all bg-gray-50"
            />
          </div>

          {/* パスワード */}
          <div className="mb-6">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-1.5">
              <span className="w-0.5 h-4 bg-indigo-500 rounded-full" />
              パスワード
            </label>
            <input
              type="password"
              placeholder="パスワードを入力"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full text-sm px-3 py-2.5 rounded-lg border border-gray-200
                outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400
                transition-all bg-gray-50"
            />
          </div>

          {/* ログインボタン */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-2.5 bg-indigo-500 hover:bg-indigo-600 active:scale-98
              text-white text-sm font-semibold rounded-xl transition-all shadow-sm
              disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? '確認中...' : 'ログイン'}
          </button>

          {/* 新規登録リンク */}
          <p className="text-center text-xs text-gray-500 mt-4">
            アカウントをお持ちでない方は
            <button
              onClick={onShowRegister}
              className="text-indigo-500 hover:text-indigo-700 font-medium ml-1 underline-offset-2 hover:underline"
            >
              新規登録
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
