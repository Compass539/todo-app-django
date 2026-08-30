import { useState } from 'react';
import { inputClass, btnPrimaryClass, btnSecondaryClass } from './ui';
import { API_BASE_URL } from './api';

function Register({ onRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error,    setError]    = useState('');
  const [success,  setSuccess]  = useState('');
  const [loading,  setLoading]  = useState(false);

  async function handleRegister() {
    if (!username || !password) {
      setError('ユーザー名とパスワードを入力してください');
      return;
    }
    setLoading(true);
    const response = await fetch(`${API_BASE_URL}/api/register/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    setLoading(false);

    if (response.ok) {
      setSuccess('登録が完了しました！ログインしてください。');
      setError('');
    } else {
      setError(data.error || '登録に失敗しました');
      setSuccess('');
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleRegister();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-4">
      <div className="w-[340px] overflow-hidden rounded-lg bg-neutral-100 shadow-lg">
        {/* 上帯 */}
        <div className="flex flex-col gap-2 bg-accent-800 px-6 pb-4 pt-6">
          <h1 className="m-0 font-heading text-[26px] leading-[1.05] text-accent-100">新規登録</h1>
          <p className="m-0 text-[13.5px] text-accent-300">アカウントを作成しよう</p>
        </div>

        {/* 本体 */}
        <div className="flex flex-col gap-3 px-6 py-6">
          {error && (
            <div className="rounded-md bg-accent-200 px-3 py-2 text-[12.5px] text-accent-900">{error}</div>
          )}
          {success && (
            <div className="rounded-md bg-accent-2-100 px-3 py-2 text-[12.5px] text-accent-2-800">{success}</div>
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

          <button onClick={handleRegister} disabled={loading} className={`${btnPrimaryClass} mt-1 w-full`}>
            {loading ? '登録中...' : '登録する'}
          </button>

          <button onClick={onRegister} className={`${btnSecondaryClass} w-full`}>
            ログインに戻る
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
