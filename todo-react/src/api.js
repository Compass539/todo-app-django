// API のベースURL。ローカルでDjangoを起動して検証する場合は
// todo-react/.env.local に VITE_API_BASE_URL=http://localhost:8000 を設定する。
// フロントエンドとAPIが同一オリジンの場合は VITE_API_BASE_URL="" を設定すると相対パスになる。
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'https://todo-app-django-sjp6.onrender.com';
