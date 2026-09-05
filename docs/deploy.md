# デプロイ記録（AWS EC2）

TaskBoardの本番環境をAWS EC2上に構築した際の作業記録と、以後のデプロイ手順をまとめる。

## 環境概要

| 項目 | 内容 |
|---|---|
| インスタンス | EC2 t3.micro / ap-northeast-1d |
| OS | Amazon Linux 2023 |
| Python | 3.13 |
| Node.js | 22 |
| Webサーバー | Nginx 1.30 |
| APサーバー | Gunicorn（systemdで常駐管理） |
| DB | PostgreSQL 17 |
| アプリ配置先 | `/opt/taskboard/app`（リポジトリをそのままclone） |
| 実行ユーザー | `taskboard`（ログインシェル無効の専用ユーザー） |

## 構成図

```
Browser
   │  http://<EC2ホスト名>/
   ▼
Nginx (:80)
   ├─ / (static)      → /opt/taskboard/app/todo-react/dist
   ├─ /static/ (static)→ /opt/taskboard/app/staticfiles
   ├─ /api/  (proxy)  → 127.0.0.1:8000 (Gunicorn)
   └─ /admin/(proxy, IP許可制) → 127.0.0.1:8000 (Gunicorn)
                              │
                              ▼
                        Gunicorn → Django (config.wsgi)
                              │
                              ▼
                        PostgreSQL 17 (127.0.0.1:5432)
```

フロントエンドとAPIを同一オリジン（Nginx配下）で配信しているため、CORS設定は本番では実質不要（`CORS_ALLOWED_ORIGINS`はローカル開発用の値のまま）。

## 構築の経緯

### 8/9 初期構築

1. Nginxをインストールし起動・自動起動を有効化
2. `/opt/taskboard` を作成し所有者をec2-userに変更
3. GitHubからリポジトリを `/opt/taskboard/app` にclone
4. Python仮想環境を作成（後にpython3.13へ入れ替え）し、`pip install -r requirements.txt`
5. `python manage.py collectstatic` で静的ファイルを生成
6. ログイン不可の専用実行ユーザー `taskboard` を作成（`useradd -r -s /sbin/nologin`、ホームディレクトリを`/var/lib/taskboard`に設定）
7. Gunicorn用のsystemdサービスを作成し起動・自動起動を有効化
8. この時点ではDBはSQLite

### 8/11 PostgreSQL移行 + フロントエンド本番対応

1. `postgresql17` / `postgresql17-server` をインストールし、`postgresql-setup --initdb` で初期化、起動・自動起動を有効化
2. `pg_hba.conf` を編集し認証方式を調整
3. DB・ユーザーを作成し、`.env` の `DATABASE_URL` をPostgreSQL接続文字列に変更
4. `python manage.py migrate` を実行し、`createsuperuser` で管理者アカウントを作成
5. Gunicornを再起動して新しいDB接続を反映
6. `nodejs22` / `npm` をインストールし、フロントエンドのビルド環境を整備
7. フロントエンドがRenderの本番URL（`https://todo-app-django-sjp6.onrender.com`）をハードコードしていたため、`sed` で相対パス（`/api/...`）に一時的に書き換え、`npm install && npm run build`
8. Nginxの設定ファイル（`/etc/nginx/conf.d/taskboard.conf`）を作成し、`/`・`/static/`・`/api/`・`/admin/`のルーティングを設定（`/admin/`は特定IPのみ許可）
9. `nginx -t` で構文確認後、`systemctl reload nginx`

このときのフロントエンド修正はサーバー上での直接編集（`sed`）による暫定対応で、gitにはコミットされていなかった。

### 9/5 Organicデザイン版への更新

1. `redesigin/organic-1d` ブランチ（Organicデザインシステムへのリデザイン）をfast-forwardで`main`にマージしGitHubへpush
2. `todo-react/src/api.js` の `API_BASE_URL` 判定を `||` から `??` に修正し、`VITE_API_BASE_URL=""`（空文字）を明示指定した場合にRenderのデフォルトURLへフォールバックせず相対パスとして扱えるように変更
3. EC2側で8/11の暫定パッチ（`sed`による直接編集）を`git stash`でバックアップし、`git pull`で最新の`main`を取得
4. `todo-react/.env.production` に `VITE_API_BASE_URL=`（空）を設定し、`npm ci && npm run build` でビルドし直し
5. ビルド成果物にRenderのURLが含まれておらず、`/api/...`の相対パスになっていることを確認
6. バックエンドはコード変更なしのためGunicorn再起動は不要。Nginxも静的ファイルの入れ替えのみで設定変更なし
7. ブラウザおよびcurlで疎通確認（`/api/todos/`が401を返すことを確認）

## 通常のデプロイ手順（コード更新時）

```bash
ssh -i <鍵ファイル> ec2-user@<EC2ホスト名>
cd /opt/taskboard/app
git pull origin main

# バックエンドに変更がある場合
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
sudo systemctl restart gunicorn

# フロントエンドに変更がある場合
cd todo-react
npm ci
npm run build   # .env.production の VITE_API_BASE_URL="" は同一オリジン構成のため必須
```

Nginxの静的ファイル配信は`dist/`を直接参照しているため、フロントエンドはビルドし直すだけで反映される（サービス再起動不要）。Nginxの設定ファイル自体を変更した場合のみ `sudo nginx -t && sudo systemctl reload nginx` を実行する。

## サービス管理コマンド

```bash
sudo systemctl status gunicorn
sudo systemctl restart gunicorn
sudo journalctl -u gunicorn -f

sudo nginx -t
sudo systemctl reload nginx

sudo systemctl status postgresql
```

## .env に設定している主なキー（値は非公開）

- `SECRET_KEY`
- `DEBUG`（本番は`False`）
- `ALLOWED_HOSTS`
- `CORS_ALLOWED_ORIGINS`
- `DATABASE_URL`（PostgreSQL接続文字列）
- `DISCORD_WEBHOOK_URL`

## 既知の制約・今後の課題

- 現状HTTP配信のみ（TLS未設定）。独自ドメイン取得とLet's Encrypt等でのHTTPS化が必要
- EC2にElastic IPを割り当てていないため、インスタンス再起動時にパブリックDNS/IPが変わる可能性がある
- `/admin/`は特定の送信元IPのみ許可（Nginxでallow/deny設定）
