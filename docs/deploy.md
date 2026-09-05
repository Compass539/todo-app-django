# デプロイ記録（AWS EC2）

TaskBoardの本番環境をAWS EC2上に構築した際の作業記録と、以後のデプロイ手順をまとめる。

## 1. 構成

- Amazon Linux 2023 / t3.micro / 東京リージョン（ap-northeast-1）
- Nginx（リバースプロキシ・静的ファイル配信）→ Gunicorn（`127.0.0.1:8000`、ワーカー2） → Django
- PostgreSQL 17を同一インスタンスに同居
- `/api/` と `/admin/` はGunicornへプロキシ、`/` はReactの`dist`を配信する同一オリジン構成（CORS設定は本番では実質不要）

```
Browser
   │  http://<EC2ホスト名>/
   ▼
Nginx (:80)
   ├─ /              (static) → /opt/taskboard/app/todo-react/dist
   ├─ /static/       (static) → /opt/taskboard/app/staticfiles
   ├─ /api/          (proxy)  → 127.0.0.1:8000 (Gunicorn, workers=2)
   └─ /admin/ (proxy, IP許可制)→ 127.0.0.1:8000 (Gunicorn)
                              │
                              ▼
                        Gunicorn → Django (config.wsgi)
                              │
                              ▼
                        PostgreSQL 17 (127.0.0.1:5432)
```

## 2. 構築手順

1. アプリ本体を `/opt/taskboard/app` に配置（GitHubリポジトリをそのままclone）
2. ログイン不可の専用システムユーザー `taskboard` を作成（`useradd -r -s /sbin/nologin`）
3. グループ方式＋setgidでディレクトリ権限を付与し、`ec2-user`とアプリ実行ユーザーの両方から扱えるようにする
4. Python仮想環境を作成し `pip install -r requirements.txt`、`collectstatic`で静的ファイルを生成
5. PostgreSQL 17をインストールし、DB・ユーザーを作成、`.env`の`DATABASE_URL`を設定して`migrate`
6. Gunicornをsystemdサービス化し、起動・自動起動を有効化
7. Node.jsをインストールし、Reactアプリを`vite build`でビルド、Nginxから`dist`を直接配信

## 3. セキュリティ設定

- SSHはパスワード認証を無効化し、鍵認証のみ許可
- セキュリティグループの22番ポート（SSH）は自分のIPアドレスのみに限定
- Nginxの`allow`/`deny`で`/admin/`を自宅IPのみに制限
- AWSの請求アラートを設定し、想定外の課金を検知できるようにした

## 4. トラブルシューティング

構築中に発生した問題と対処。

- **`cp39`のビルドエラーからPythonバージョン不一致を特定**: `pip install`時のエラーメッセージに`cp39`（CPython 3.9向けビルド）が含まれており、ローカル開発環境（Python 3.13）とEC2のデフォルトPython（3.9）のバージョン差が原因と判明。`python3.13`を追加インストールし、venvを作り直して解決。
- **`/opt`配下でのPermission denied**: `/opt/taskboard`の所有者・権限が不足しており書き込みできなかった。所有者をec2-user/専用グループに変更し、setgidを設定して解決。
- **Gunicornが起動時に想定外のアドレスで待受**: `--bind`引数を明示していなかったため意図しない挙動になっていた。systemdの`ExecStart`に`--bind 127.0.0.1:8000`を明示して解決。
- **Nginxの`server_names_hash_bucket_size`エラー**: `server_name`にホスト名を直接指定した際にNginxが起動エラーを出した。ワイルドカード的に受ける`server_name _;`に変更して解決。
- **`usermod -l`後に`Permission denied: '/home/user1'`**: 作成したユーザー名を`user1`から`taskboard`へ`usermod -l`で変更したが、ホームディレクトリのパスは自動的に変わらず、存在しない`/home/user1`を参照し続けてエラーになった。`/var/lib/taskboard`を新規作成し、`usermod -d /var/lib/taskboard taskboard`でホームディレクトリを明示的に再設定して解決。

## 5. 再起動テスト

- `gunicorn`・`nginx`とも`systemctl enable`済みであることを確認
- インスタンス再起動後にサービスが自動起動することを確認
- `curl`で`/admin/`等にアクセスし、想定通り302（リダイレクト）応答が返ることを確認

## 更新履歴

- **8/9**: 上記の初期構築を実施（DBはこの時点ではSQLite）
- **8/11**: PostgreSQL 17へ移行。Node.js導入とReactビルド環境整備、フロントエンドがハードコードしていたRenderの本番URLを`sed`で相対パス（`/api/...`）に一時的に書き換えて`npm run build`（この時点ではgit未コミットの暫定対応）
- **9/5**: `redesigin/organic-1d`（Organicデザインシステムへのリデザイン）を`main`にマージ。`todo-react/src/api.js`の`API_BASE_URL`判定を`||`から`??`に修正し、`VITE_API_BASE_URL=""`（空文字）を明示指定した場合に相対パスとして扱えるよう変更。EC2側では8/11の暫定パッチを`git stash`でバックアップしてから`git pull`し、`todo-react/.env.production`に`VITE_API_BASE_URL=`を設定して`npm ci && npm run build`。ビルド成果物にRenderのURLが含まれず`/api/...`の相対パスになっていること、`/api/todos/`が401を返すことを確認

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

Nginxの静的ファイル配信は`dist/`を直接参照しているため、フロントエンドはビルドし直すだけで反映される（サービス再起動不要）。Nginxの設定ファイル自体を変更した場合のみ`sudo nginx -t && sudo systemctl reload nginx`を実行する。

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
