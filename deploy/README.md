# デプロイ用設定ファイル

EC2本番環境に配置しているsystemdユニットファイル。サーバー上の設定をリポジトリでバージョン管理し、環境を再現できる状態にしている。

| ファイル | 配置先 | 役割 |
|---|---|---|
| `systemd/gunicorn.service` | `/etc/systemd/system/` | Djangoアプリの常駐（Gunicorn） |
| `systemd/taskboard-alert.service` | `/etc/systemd/system/` | Discord期限通知の実行 |
| `systemd/taskboard-alert.timer` | `/etc/systemd/system/` | 上記を毎朝8時（JST）に起動 |

## 反映手順

```bash
sudo cp deploy/systemd/*.service deploy/systemd/*.timer /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl restart gunicorn
sudo systemctl restart taskboard-alert.timer
```

## 注意

- これらのファイルにシークレットは含まれない。環境変数は `/opt/taskboard/app/.env`（Git管理外、パーミッション640）から読み込む
- `taskboard-alert.service` に `[Install]` セクションはない。タイマーから呼ばれるため、`enable` するのは `.timer` のみ
- サーバーのタイムゾーンはUTC。`OnCalendar` に `Asia/Tokyo` を明示している

詳細な構築記録は [`../docs/deploy.md`](../docs/deploy.md) を参照。