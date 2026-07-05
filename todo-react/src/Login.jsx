import { useState } from 'react';

function Login({ onLogin, onShowRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleLogin() {
    const response = await fetch('http://127.0.0.1:8000/api/token/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    if (response.ok) {
      const data = await response.json();
      onLogin(data.access);
    } else {
      setError('ユーザー名またはパスワードが間違っています');
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-sm p-8">

        <h1 className="text-2xl font-bold text-center mb-8">TaskBoard</h1>
        <h2 className="text-lg font-semibold text-center mb-6">ログイン</h2>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        <div className="mb-4">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
            <span className="w-1 h-4 bg-indigo-500 rounded-full inline-block"></span>
            ユーザー名
          </label>
          <input
            type="text"
            placeholder="ユーザー名を入力"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          />
        </div>

        <div className="mb-6">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
            <span className="w-1 h-4 bg-indigo-500 rounded-full inline-block"></span>
            パスワード
          </label>
          <input
            type="password"
            placeholder="パスワードを入力"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          />
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 rounded-full transition-colors"
        >
          ログイン
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          アカウントをお持ちでない方は
          <button
            onClick={onShowRegister}
            className="text-indigo-500 hover:underline ml-1"
          >
            新規登録
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;