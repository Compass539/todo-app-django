import { useState } from 'react';
import { inputClass, btnPrimaryClass } from './ui';
import { API_BASE_URL } from './api';

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
    const response = await fetch(`${API_BASE_URL}/api/token/`, {
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
    <div className="flex min-h-screen items-center justify-center bg-bg px-4">
      <div className="w-[340px] overflow-hidden rounded-lg bg-neutral-100 shadow-lg">
        {/* 上帯 */}
        <div className="flex flex-col gap-2 bg-accent-800 px-6 pb-4 pt-6">
          <div className="flex h-[44px] w-[44px] items-center justify-center rounded-full bg-accent-400 font-heading text-[19px] text-accent-900">
            T
          </div>
          <h1 className="m-0 font-heading text-[28px] leading-[1.05] text-accent-100">TaskBoard</h1>
          <p className="m-0 text-[13.5px] text-accent-300">タスクをスマートに管理しよう</p>
        </div>

        {/* 本体 */}
        <div className="flex flex-col gap-3 px-6 py-6">
          {error && (
            <div className="rounded-md bg-accent-200 px-3 py-2 text-[12.5px] text-accent-900">{error}</div>
          )}

          <div className="flex flex-col gap-1">
            <label className="text-[13px] font-semibold text-neutral-800">ユーザー名</label>
            <input
              type="text"
              placeholder="ユーザー名を入力"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={handleKeyDown}
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[13px] font-semibold text-neutral-800">パスワード</label>
            <input
              type="password"
              placeholder="パスワードを入力"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              className={inputClass}
            />
          </div>

          <button onClick={handleLogin} disabled={loading} className={`${btnPrimaryClass} mt-1 w-full`}>
            {loading ? '確認中...' : 'ログイン'}
          </button>

          <p className="m-0 text-center text-[12px] text-neutral-700">
            アカウントをお持ちでない方は{' '}
            <button onClick={onShowRegister} className="font-bold text-accent-700 hover:underline">
              新規登録
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
