import {useState} from 'react';

function Register({ onRegister})  {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    async function handleRegister() {
        const response = await fetch ('http://127.0.0.1:8000/api/register/', {
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, password})
        });
        
        const data = await response.json();

        if (response.ok){
            setSuccess('登録が完了しました！ログインしてください。');
            setError('');
        } else{
            setError(data.error);
            setSuccess('');
        } 
    }

    return(
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-md w-full max-w-sm p-8">
                <h1 className="text-2xl font-bold text-center mb-8">新規登録</h1>
                {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
                {success && <p className="text-green-500 text-sm text-center mb-4">{success}</p>}
                <input 
                    type="text"
                    placeholder='ユーザー名'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                />

                <input 
                    type="password"
                    placeholder='パスワード'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                />

                <button onClick={handleRegister}
                    className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 rounded-full transition-colors mb-2">
                    登録</button>
                <button onClick={onRegister}
                    className="w-full border border-gray-300 hover:bg-gray-50 text-gray-600 font-semibold py-2 rounded-full transition-colors"
                    >ログインに戻る</button>
            </div>
        </div>
    );
}

export default Register;