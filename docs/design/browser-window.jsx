<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<script src="./support.js"></script>
</head>
<body>
<x-dc>
<helmet data-dc-atomics>
<meta name="design_doc_mode" content="canvas">
<link rel="stylesheet" href="_ds/organic-67fc9fd4-2810-47fb-93bd-1c04247e51b3/styles.css">
<script src="_ds/organic-67fc9fd4-2810-47fb-93bd-1c04247e51b3/_ds_bundle.js"></script>
<style>
body{margin:0;background:#e9e4da;font-family:"Figtree",system-ui,sans-serif}
a{color:#8c491a}a:hover{color:#643312}
.dv-turn{padding:40px 44px 32px;border-bottom:1px solid rgba(0,0,0,.08);scroll-margin-top:16px}
.dv-thd{display:flex;align-items:baseline;gap:10px;margin:0 0 20px}
.dv-tid{font:600 10px ui-monospace,Menlo,monospace;padding:3px 7px;background:#201e1d;color:#fff;border-radius:4px;text-decoration:none}
.dv-tname{font:600 13px/1.2 system-ui,sans-serif;color:#201e1d}
.dv-opts{display:flex;flex-wrap:wrap;gap:40px;align-items:flex-start}
.dv-opt{flex:none;display:flex;flex-direction:column;gap:10px;scroll-margin-top:16px}
.dv-oid{font:600 10.5px ui-monospace,Menlo,monospace;padding:3px 7px;background:rgba(0,0,0,.08);color:#201e1d;border-radius:5px;text-decoration:none}
.dv-olabel{display:flex;align-items:baseline;gap:8px;font:400 11.5px/1.4 system-ui,sans-serif;color:rgba(0,0,0,.55);max-width:1080px}
.dv-opt:target .dv-oid{background:#c67139;color:#fff}
.dv-row{display:flex;flex-wrap:wrap;gap:24px;align-items:flex-start}
.dv-sub{font:400 10.5px/1.3 system-ui,sans-serif;color:rgba(0,0,0,.45);margin:0 0 6px}
.dv-next{margin:22px 0 0;font:12px/1.6 system-ui,sans-serif;color:rgba(0,0,0,.5)}
.bare{border-radius:12px;overflow:hidden;box-shadow:0 8px 28px rgba(0,0,0,.14)}
</style>
</helmet>

<section class="dv-turn" id="t1">
<div class="dv-thd"><a class="dv-tid" href="#t1">1</a><span class="dv-tname">TaskBoard リデザイン案 1d 細いレール＋期限グルーピング／高密度</span></div>
<div class="dv-opts">
<div class="dv-opt" id="1d">
<div class="dv-olabel"><a class="dv-oid" href="#1d">1d</a>Organic・細い左レール＋期限でグルーピング／高密度 — ナビをアイコンのみのレールに縮め、カテゴリではなく「期限切れ／今日／今週」で並べる案。1行44pxで一覧性を最大化。</div>
<x-import component-from-global-scope="ChromeWindow" from="./browser-window.jsx" url="taskboard.app/today" width="1080px" height="744px" hint-size="1080px,744px">
<div style="display:flex;height:660px;overflow:hidden;background:var(--color-bg);font-family:var(--font-body)">
  <div style="width:80px;background:var(--color-accent-800);display:flex;flex-direction:column;align-items:center;gap:var(--space-3);padding:var(--space-4) 0;flex-shrink:0">
    <div style="width:44px;height:44px;border-radius:999px;background:var(--color-accent-400);color:var(--color-accent-900);display:flex;align-items:center;justify-content:center;font-family:var(--font-heading);font-size:19px">T</div>
    <div style="width:44px;height:44px;border-radius:999px;background:var(--color-accent-100);display:flex;align-items:center;justify-content:center;font-size:19px">💼</div>
    <div style="width:44px;height:44px;border-radius:999px;background:rgba(255,255,255,.12);display:flex;align-items:center;justify-content:center;font-size:19px">🏠</div>
    <div style="width:44px;height:44px;border-radius:999px;background:rgba(255,255,255,.12);display:flex;align-items:center;justify-content:center;font-size:19px">📦</div>
    <div style="width:44px;height:44px;border-radius:999px;background:rgba(255,255,255,.12);display:flex;align-items:center;justify-content:center;font-size:19px">📋</div>
    <div style="flex:1"></div>
    <div style="width:44px;height:44px;border-radius:999px;background:var(--color-accent-2-500);color:#fff;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700">{{ u }}</div>
  </div>

  <main style="flex:1;display:flex;flex-direction:column;overflow:hidden;padding:var(--space-6) var(--space-6) 0">
    <div style="display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:var(--space-4)">
      <div>
        <h1 style="font-family:var(--font-heading);font-size:32px;line-height:1;margin:0;color:var(--color-text)">💼 仕事</h1>
        <p style="font-size:13px;color:var(--color-neutral-700);margin:var(--space-1) 0 0">4タスク · 未完了 3 · 完了 1</p>
      </div>
      <div style="display:flex;align-items:center;gap:var(--space-2)">
        <div style="padding:8px var(--space-4);border-radius:999px;background:var(--color-neutral-100);color:var(--color-neutral-600);font-size:13px;width:180px">検索…</div>
        <div class="btn btn-primary">＋ タスクを追加</div>
      </div>
    </div>

    <div style="flex:1;display:flex;gap:var(--space-6);overflow:hidden">
      <div style="flex:1;display:flex;flex-direction:column;gap:var(--space-2);overflow-y:auto;max-width:620px">

        <p style="font-size:11.5px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;color:var(--color-accent-700);margin:0 0 var(--space-1)">期限切れ · 2</p>
        <div style="display:flex;align-items:center;gap:var(--space-3);height:44px;padding:0 var(--space-4);border-radius:999px;background:var(--color-accent-200)">
          <span style="width:19px;height:19px;border-radius:999px;border:2.75px solid var(--color-accent-600);flex-shrink:0"></span>
          <span style="flex:1;font-size:15px;font-weight:600;color:var(--color-accent-900)">見積書を作成して送付</span>
          <span style="font-size:12.5px;font-weight:700;color:var(--color-accent-800)">08-25</span>
        </div>
        <div style="display:flex;align-items:center;gap:var(--space-3);height:44px;padding:0 var(--space-4);border-radius:999px;background:var(--color-accent-200)">
          <span style="width:19px;height:19px;border-radius:999px;border:2.75px solid var(--color-accent-600);flex-shrink:0"></span>
          <span style="flex:1;font-size:15px;font-weight:600;color:var(--color-accent-900)">先月分の経費を精算</span>
          <span style="font-size:12.5px;font-weight:700;color:var(--color-accent-800)">08-27</span>
        </div>

        <p style="font-size:11.5px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;color:var(--color-neutral-600);margin:var(--space-3) 0 var(--space-1)">今週 · 3</p>
        <div style="display:flex;align-items:center;gap:var(--space-3);height:44px;padding:0 var(--space-4);border-radius:999px;background:var(--color-neutral-100)">
          <span style="width:19px;height:19px;border-radius:999px;border:2.75px solid var(--color-neutral-400);flex-shrink:0"></span>
          <span style="flex:1;font-size:15px;font-weight:600;color:var(--color-text)">週次ミーティングの議題整理</span>
          <span style="font-size:12.5px;color:var(--color-neutral-700)">08-31</span>
        </div>
        <div style="display:flex;align-items:center;gap:var(--space-3);height:44px;padding:0 var(--space-4);border-radius:999px;background:var(--color-neutral-100)">
          <span style="width:19px;height:19px;border-radius:999px;border:2.75px solid var(--color-neutral-400);flex-shrink:0"></span>
          <span style="flex:1;font-size:15px;font-weight:600;color:var(--color-text)">API仕様書のレビュー</span>
          <span style="font-size:12.5px;color:var(--color-neutral-700)">09-03</span>
        </div>
        <div style="display:flex;align-items:center;gap:var(--space-3);height:44px;padding:0 var(--space-4);border-radius:999px;background:var(--color-neutral-100)">
          <span style="width:19px;height:19px;border-radius:999px;border:2.75px solid var(--color-neutral-400);flex-shrink:0"></span>
          <span style="flex:1;font-size:15px;font-weight:600;color:var(--color-text)">採用面談のフィードバック記入</span>
          <span style="font-size:12.5px;color:var(--color-neutral-700)">09-04</span>
        </div>

        <p style="font-size:11.5px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;color:var(--color-accent-2-700);margin:var(--space-3) 0 var(--space-1)">完了 · 1</p>
        <div style="display:flex;align-items:center;gap:var(--space-3);height:44px;padding:0 var(--space-4);border-radius:999px;background:var(--color-accent-2-100)">
          <span style="width:19px;height:19px;border-radius:999px;background:var(--color-accent-2-500);color:#fff;display:flex;align-items:center;justify-content:center;font-size:11px;flex-shrink:0">✓</span>
          <span style="flex:1;font-size:15px;color:var(--color-accent-2-800);text-decoration:line-through">請求書の送付</span>
          <span style="font-size:12.5px;color:var(--color-accent-2-700)">08-20</span>
        </div>

      </div>

      <div style="width:236px;display:flex;flex-direction:column;gap:var(--space-3);flex-shrink:0">
        <div style="background:var(--color-surface);border-radius:var(--radius-lg);padding:var(--space-4);display:flex;flex-direction:column;align-items:center;gap:var(--space-2)">
          <div style="width:120px;height:120px;border-radius:999px;background:conic-gradient(var(--color-accent-2-500) 0turn 0.4turn, var(--color-neutral-300) 0.4turn 1turn);display:flex;align-items:center;justify-content:center">
            <div style="width:88px;height:88px;border-radius:999px;background:var(--color-surface);display:flex;flex-direction:column;align-items:center;justify-content:center">
              <span style="font-family:var(--font-heading);font-size:26px;line-height:1;color:var(--color-text)">40%</span>
              <span style="font-size:11px;color:var(--color-neutral-700)">完了</span>
            </div>
          </div>
          <p style="font-size:13px;color:var(--color-neutral-700);margin:0;text-align:center">10件のうち4件が完了</p>
        </div>
        <div style="background:var(--color-neutral-100);border-radius:var(--radius-lg);padding:var(--space-4);display:flex;flex-direction:column;gap:var(--space-2)">
          <p style="font-size:11.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--color-neutral-600);margin:0">サマリー</p>
          <div style="display:flex;justify-content:space-between;align-items:baseline"><span style="font-size:13.5px;color:var(--color-neutral-700)">合計タスク</span><span style="font-family:var(--font-heading);font-size:19px;color:var(--color-text)">10</span></div>
          <div style="display:flex;justify-content:space-between;align-items:baseline"><span style="font-size:13.5px;color:var(--color-neutral-700)">完了済み</span><span style="font-family:var(--font-heading);font-size:19px;color:var(--color-accent-2-700)">4</span></div>
          <div style="display:flex;justify-content:space-between;align-items:baseline"><span style="font-size:13.5px;color:var(--color-neutral-700)">期限切れ</span><span style="font-family:var(--font-heading);font-size:19px;color:var(--color-accent-700)">2</span></div>
        </div>
        <div style="background:var(--color-accent-100);border-radius:var(--radius-lg);padding:var(--space-4)">
          <p style="font-size:12.5px;color:var(--color-accent-800);margin:0">期限が1週間以内のタスクは Discord に通知されます。</p>
        </div>
      </div>
    </div>
  </main>
</div>
</x-import>

<div>
  <p class="dv-sub">タスク追加フォーム展開時（一覧最上部に1行で開く）</p>
  <div class="bare" style="width:620px;background:var(--color-bg);padding:var(--space-4);font-family:var(--font-body);display:flex;flex-direction:column;gap:var(--space-2)">
    <div style="display:flex;align-items:center;gap:var(--space-3);min-height:44px;padding:var(--space-2) var(--space-4);border-radius:var(--radius-lg);background:var(--color-neutral-100);box-shadow:var(--shadow-md);border:2px solid var(--color-accent-400);flex-wrap:wrap">
      <span style="width:19px;height:19px;border-radius:999px;border:2.75px solid var(--color-neutral-400);flex-shrink:0"></span>
      <span style="flex:1;min-width:180px;font-size:15px;color:var(--color-neutral-600)">タスク名を入力…</span>
      <span class="tag tag-accent">💼 仕事</span>
      <span class="tag tag-neutral">📅 08-31</span>
      <div class="btn btn-primary" style="padding:6px 18px">追加</div>
    </div>
    <div style="display:flex;align-items:center;gap:var(--space-3);height:44px;padding:0 var(--space-4);border-radius:999px;background:var(--color-accent-200)">
      <span style="width:19px;height:19px;border-radius:999px;border:2.75px solid var(--color-accent-600);flex-shrink:0"></span>
      <span style="flex:1;font-size:15px;font-weight:600;color:var(--color-accent-900)">見積書を作成して送付</span>
      <span style="font-size:12.5px;font-weight:700;color:var(--color-accent-800)">08-25</span>
    </div>
    <div style="display:flex;align-items:center;gap:var(--space-3);height:44px;padding:0 var(--space-4);border-radius:999px;background:var(--color-neutral-100)">
      <span style="width:19px;height:19px;border-radius:999px;border:2.75px solid var(--color-neutral-400);flex-shrink:0"></span>
      <span style="flex:1;font-size:15px;font-weight:600;color:var(--color-text)">週次ミーティングの議題整理</span>
      <span style="font-size:12.5px;color:var(--color-neutral-700)">08-31</span>
    </div>
  </div>
</div>
</div>


<div class="dv-opt" id="1e">
<div class="dv-olabel"><a class="dv-oid" href="#1e">1e</a>ログイン・新規登録（<a class="dv-oid" href="#1d">1d</a>の言語で）— レールと同じテラコッタ濃色の帯をカード上部に置き、フォームはピル入力に統一。</div>
<div class="dv-row">
  <div>
    <p class="dv-sub">ログイン</p>
    <div class="bare" style="width:460px;background:var(--color-bg);padding:var(--space-8) var(--space-6);font-family:var(--font-body);display:flex;justify-content:center">
      <div style="width:340px;background:var(--color-neutral-100);border-radius:var(--radius-lg);overflow:hidden;box-shadow:var(--shadow-lg)">
        <div style="background:var(--color-accent-800);padding:var(--space-6) var(--space-6) var(--space-4);display:flex;flex-direction:column;gap:var(--space-2)">
          <div style="width:44px;height:44px;border-radius:999px;background:var(--color-accent-400);color:var(--color-accent-900);display:flex;align-items:center;justify-content:center;font-family:var(--font-heading);font-size:19px">T</div>
          <h1 style="font-family:var(--font-heading);font-size:28px;line-height:1.05;margin:0;color:var(--color-accent-100)">TaskBoard</h1>
          <p style="font-size:13.5px;color:var(--color-accent-300);margin:0">タスクをスマートに管理しよう</p>
        </div>
        <div style="padding:var(--space-6);display:flex;flex-direction:column;gap:var(--space-3)">
          <div style="display:flex;flex-direction:column;gap:var(--space-1)">
            <label style="font-size:13px;font-weight:600;color:var(--color-neutral-800)">ユーザー名</label>
            <div class="input" style="color:var(--color-neutral-600)">ユーザー名を入力</div>
          </div>
          <div style="display:flex;flex-direction:column;gap:var(--space-1)">
            <label style="font-size:13px;font-weight:600;color:var(--color-neutral-800)">パスワード</label>
            <div class="input" style="color:var(--color-neutral-600)">パスワードを入力</div>
          </div>
          <div class="btn btn-primary btn-block" style="margin-top:var(--space-1)">ログイン</div>
          <p style="text-align:center;font-size:12px;color:var(--color-neutral-700);margin:0">アカウントをお持ちでない方は <span style="color:var(--color-accent-700);font-weight:700">新規登録</span></p>
        </div>
      </div>
    </div>
  </div>
  <div>
    <p class="dv-sub">新規登録</p>
    <div class="bare" style="width:460px;background:var(--color-bg);padding:var(--space-8) var(--space-6);font-family:var(--font-body);display:flex;justify-content:center">
      <div style="width:340px;background:var(--color-neutral-100);border-radius:var(--radius-lg);overflow:hidden;box-shadow:var(--shadow-lg)">
        <div style="background:var(--color-accent-800);padding:var(--space-6) var(--space-6) var(--space-4);display:flex;flex-direction:column;gap:var(--space-2)">
          <h1 style="font-family:var(--font-heading);font-size:26px;line-height:1.05;margin:0;color:var(--color-accent-100)">新規登録</h1>
          <p style="font-size:13.5px;color:var(--color-accent-300);margin:0">アカウントを作成しよう</p>
        </div>
        <div style="padding:var(--space-6);display:flex;flex-direction:column;gap:var(--space-3)">
          <div style="padding:var(--space-2) var(--space-3);border-radius:var(--radius-md);background:var(--color-accent-2-100);color:var(--color-accent-2-800);font-size:12.5px">登録が完了しました！ログインしてください。</div>
          <div style="display:flex;flex-direction:column;gap:var(--space-1)">
            <label style="font-size:13px;font-weight:600;color:var(--color-neutral-800)">ユーザー名</label>
            <div class="input" style="color:var(--color-neutral-600)">ユーザー名を入力</div>
          </div>
          <div style="display:flex;flex-direction:column;gap:var(--space-1)">
            <label style="font-size:13px;font-weight:600;color:var(--color-neutral-800)">パスワード</label>
            <div class="input" style="color:var(--color-neutral-600)">パスワードを入力</div>
          </div>
          <div class="btn btn-primary btn-block" style="margin-top:var(--space-1)">登録する</div>
          <div class="btn btn-secondary btn-block">ログインに戻る</div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>

<div class="dv-opt" id="1f">
<div class="dv-olabel"><a class="dv-oid" href="#1f">1f</a>スマホ表示 — レールを下部のタブバーに変換。行の高さは48pxでタップ領域を確保、追加は右下の丸ボタン。</div>
<x-import component-from-global-scope="IOSDevice" from="./ios-frame.jsx" hint-size="402px,874px">
<div style="height:100%;background:var(--color-bg);font-family:var(--font-body);display:flex;flex-direction:column">
  <div style="padding:70px var(--space-4) var(--space-3);display:flex;flex-direction:column;gap:var(--space-2)">
    <h1 style="font-family:var(--font-heading);font-size:28px;line-height:1;margin:0;color:var(--color-text)">💼 仕事</h1>
    <p style="font-size:13px;color:var(--color-neutral-700);margin:0">4タスク · 未完了 3 · 完了 1</p>
    <div style="padding:11px var(--space-4);border-radius:999px;background:var(--color-neutral-100);color:var(--color-neutral-600);font-size:14px">検索…</div>
  </div>
  <div style="flex:1;overflow-y:auto;padding:0 var(--space-4);display:flex;flex-direction:column;gap:var(--space-2)">
    <p style="font-size:11.5px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;color:var(--color-accent-700);margin:var(--space-1) 0 0">期限切れ · 2</p>
    <div style="display:flex;align-items:center;gap:var(--space-3);min-height:48px;padding:0 var(--space-4);border-radius:999px;background:var(--color-accent-200)">
      <span style="width:20px;height:20px;border-radius:999px;border:2.75px solid var(--color-accent-600);flex-shrink:0"></span>
      <span style="flex:1;font-size:15px;font-weight:600;color:var(--color-accent-900)">見積書を作成して送付</span>
      <span style="font-size:12.5px;font-weight:700;color:var(--color-accent-800)">08-25</span>
    </div>
    <div style="display:flex;align-items:center;gap:var(--space-3);min-height:48px;padding:0 var(--space-4);border-radius:999px;background:var(--color-accent-200)">
      <span style="width:20px;height:20px;border-radius:999px;border:2.75px solid var(--color-accent-600);flex-shrink:0"></span>
      <span style="flex:1;font-size:15px;font-weight:600;color:var(--color-accent-900)">先月分の経費を精算</span>
      <span style="font-size:12.5px;font-weight:700;color:var(--color-accent-800)">08-27</span>
    </div>
    <p style="font-size:11.5px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;color:var(--color-neutral-600);margin:var(--space-3) 0 0">今週 · 3</p>
    <div style="display:flex;align-items:center;gap:var(--space-3);min-height:48px;padding:0 var(--space-4);border-radius:999px;background:var(--color-neutral-100)">
      <span style="width:20px;height:20px;border-radius:999px;border:2.75px solid var(--color-neutral-400);flex-shrink:0"></span>
      <span style="flex:1;font-size:15px;font-weight:600;color:var(--color-text)">週次ミーティングの議題整理</span>
      <span style="font-size:12.5px;color:var(--color-neutral-700)">08-31</span>
    </div>
    <div style="display:flex;align-items:center;gap:var(--space-3);min-height:48px;padding:0 var(--space-4);border-radius:999px;background:var(--color-neutral-100)">
      <span style="width:20px;height:20px;border-radius:999px;border:2.75px solid var(--color-neutral-400);flex-shrink:0"></span>
      <span style="flex:1;font-size:15px;font-weight:600;color:var(--color-text)">API仕様書のレビュー</span>
      <span style="font-size:12.5px;color:var(--color-neutral-700)">09-03</span>
    </div>
    <div style="display:flex;align-items:center;gap:var(--space-3);min-height:48px;padding:0 var(--space-4);border-radius:999px;background:var(--color-neutral-100)">
      <span style="width:20px;height:20px;border-radius:999px;border:2.75px solid var(--color-neutral-400);flex-shrink:0"></span>
      <span style="flex:1;font-size:15px;font-weight:600;color:var(--color-text)">採用面談のフィードバック記入</span>
      <span style="font-size:12.5px;color:var(--color-neutral-700)">09-04</span>
    </div>
    <p style="font-size:11.5px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;color:var(--color-accent-2-700);margin:var(--space-3) 0 0">完了 · 1</p>
    <div style="display:flex;align-items:center;gap:var(--space-3);min-height:48px;padding:0 var(--space-4);border-radius:999px;background:var(--color-accent-2-100)">
      <span style="width:20px;height:20px;border-radius:999px;background:var(--color-accent-2-500);color:#fff;display:flex;align-items:center;justify-content:center;font-size:11px;flex-shrink:0">✓</span>
      <span style="flex:1;font-size:15px;color:var(--color-accent-2-800);text-decoration:line-through">請求書の送付</span>
      <span style="font-size:12.5px;color:var(--color-accent-2-700)">08-20</span>
    </div>
  </div>
  <div style="position:relative;padding:var(--space-3) var(--space-4) var(--space-6);background:var(--color-surface);display:flex;align-items:center;justify-content:space-between">
    <div style="width:52px;height:52px;border-radius:999px;background:var(--color-accent-200);display:flex;align-items:center;justify-content:center;font-size:20px">💼</div>
    <div style="width:52px;height:52px;border-radius:999px;display:flex;align-items:center;justify-content:center;font-size:20px">🏠</div>
    <div style="width:52px;height:52px;border-radius:999px;display:flex;align-items:center;justify-content:center;font-size:20px">📦</div>
    <div style="width:52px;height:52px;border-radius:999px;display:flex;align-items:center;justify-content:center;font-size:20px">📅</div>
    <div style="width:56px;height:56px;border-radius:999px;background:var(--color-accent-500);color:#fff;display:flex;align-items:center;justify-content:center;font-size:26px;box-shadow:var(--shadow-md)">＋</div>
  </div>
</div>
</x-import>
</div>

<div class="dv-opt" id="1g">
<div class="dv-olabel"><a class="dv-oid" href="#1g">1g</a>カレンダー画面（新規機能）— READMEの「今後の展望」より。期限日を月グリッドに配置し、テラコッタ＝期限切れ、セージ＝完了で色分け。右に選択日の詳細。</div>
<x-import component-from-global-scope="ChromeWindow" from="./browser-window.jsx" url="taskboard.app/calendar" width="1080px" height="744px" hint-size="1080px,744px">
<div style="display:flex;height:660px;overflow:hidden;background:var(--color-bg);font-family:var(--font-body)">
  <div style="width:80px;background:var(--color-accent-800);display:flex;flex-direction:column;align-items:center;gap:var(--space-3);padding:var(--space-4) 0;flex-shrink:0">
    <div style="width:44px;height:44px;border-radius:999px;background:var(--color-accent-400);color:var(--color-accent-900);display:flex;align-items:center;justify-content:center;font-family:var(--font-heading);font-size:19px">T</div>
    <div style="width:44px;height:44px;border-radius:999px;background:rgba(255,255,255,.12);display:flex;align-items:center;justify-content:center;font-size:19px">💼</div>
    <div style="width:44px;height:44px;border-radius:999px;background:rgba(255,255,255,.12);display:flex;align-items:center;justify-content:center;font-size:19px">🏠</div>
    <div style="width:44px;height:44px;border-radius:999px;background:rgba(255,255,255,.12);display:flex;align-items:center;justify-content:center;font-size:19px">📦</div>
    <div style="width:44px;height:44px;border-radius:999px;background:var(--color-accent-100);display:flex;align-items:center;justify-content:center;font-size:19px">📅</div>
    <div style="flex:1"></div>
    <div style="width:44px;height:44px;border-radius:999px;background:var(--color-accent-2-500);color:#fff;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700">{{ u }}</div>
  </div>

  <main style="flex:1;display:flex;flex-direction:column;overflow:hidden;padding:var(--space-6) var(--space-6) var(--space-4)">
    <div style="display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:var(--space-4)">
      <div style="display:flex;align-items:baseline;gap:var(--space-4)">
        <h1 style="font-family:var(--font-heading);font-size:32px;line-height:1;margin:0;color:var(--color-text)">2026年 8月</h1>
        <div style="display:flex;gap:var(--space-1)">
          <span style="width:32px;height:32px;border-radius:999px;background:var(--color-neutral-100);color:var(--color-neutral-700);display:flex;align-items:center;justify-content:center;font-size:14px">‹</span>
          <span style="width:32px;height:32px;border-radius:999px;background:var(--color-neutral-100);color:var(--color-neutral-700);display:flex;align-items:center;justify-content:center;font-size:14px">›</span>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:var(--space-2)">
        <div style="display:flex;background:var(--color-neutral-100);border-radius:999px;padding:3px">
          <span style="padding:6px var(--space-4);border-radius:999px;background:var(--color-accent-500);color:#fff;font-size:13px;font-weight:700">月</span>
          <span style="padding:6px var(--space-4);border-radius:999px;color:var(--color-neutral-700);font-size:13px">週</span>
          <span style="padding:6px var(--space-4);border-radius:999px;color:var(--color-neutral-700);font-size:13px">リスト</span>
        </div>
        <div class="btn btn-primary">＋ タスクを追加</div>
      </div>
    </div>

    <div style="flex:1;display:flex;gap:var(--space-4);overflow:hidden">
      <div style="flex:1;display:flex;flex-direction:column;gap:6px;min-width:0">
        <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:6px">
          <span style="text-align:center;font-size:11.5px;font-weight:700;color:var(--color-accent-700)">日</span>
          <span style="text-align:center;font-size:11.5px;font-weight:700;color:var(--color-neutral-600)">月</span>
          <span style="text-align:center;font-size:11.5px;font-weight:700;color:var(--color-neutral-600)">火</span>
          <span style="text-align:center;font-size:11.5px;font-weight:700;color:var(--color-neutral-600)">水</span>
          <span style="text-align:center;font-size:11.5px;font-weight:700;color:var(--color-neutral-600)">木</span>
          <span style="text-align:center;font-size:11.5px;font-weight:700;color:var(--color-neutral-600)">金</span>
          <span style="text-align:center;font-size:11.5px;font-weight:700;color:var(--color-accent-2-700)">土</span>
        </div>
        <div style="flex:1;display:grid;grid-template-columns:repeat(7,1fr);grid-auto-rows:1fr;gap:6px">
          <div style="border-radius:var(--radius-md);background:transparent"></div>
          <div style="border-radius:var(--radius-md);background:transparent"></div>
          <div style="border-radius:var(--radius-md);background:transparent"></div>
          <div style="border-radius:var(--radius-md);background:transparent"></div>
          <div style="border-radius:var(--radius-md);background:transparent"></div>
          <div style="border-radius:var(--radius-md);background:transparent"></div>
          <div style="border-radius:var(--radius-md);background:var(--color-neutral-100);padding:7px 9px"><span style="font-size:12.5px;font-weight:700;color:var(--color-neutral-700)">1</span></div>

          <div style="border-radius:var(--radius-md);background:var(--color-neutral-100);padding:7px 9px"><span style="font-size:12.5px;font-weight:700;color:var(--color-neutral-700)">2</span></div>
          <div style="border-radius:var(--radius-md);background:var(--color-neutral-100);padding:7px 9px"><span style="font-size:12.5px;font-weight:700;color:var(--color-neutral-700)">3</span></div>
          <div style="border-radius:var(--radius-md);background:var(--color-neutral-100);padding:7px 9px"><span style="font-size:12.5px;font-weight:700;color:var(--color-neutral-700)">4</span></div>
          <div style="border-radius:var(--radius-md);background:var(--color-neutral-100);padding:7px 9px"><span style="font-size:12.5px;font-weight:700;color:var(--color-neutral-700)">5</span></div>
          <div style="border-radius:var(--radius-md);background:var(--color-neutral-100);padding:7px 9px"><span style="font-size:12.5px;font-weight:700;color:var(--color-neutral-700)">6</span></div>
          <div style="border-radius:var(--radius-md);background:var(--color-neutral-100);padding:7px 9px"><span style="font-size:12.5px;font-weight:700;color:var(--color-neutral-700)">7</span></div>
          <div style="border-radius:var(--radius-md);background:var(--color-neutral-100);padding:7px 9px"><span style="font-size:12.5px;font-weight:700;color:var(--color-neutral-700)">8</span></div>

          <div style="border-radius:var(--radius-md);background:var(--color-neutral-100);padding:7px 9px"><span style="font-size:12.5px;font-weight:700;color:var(--color-neutral-700)">9</span></div>
          <div style="border-radius:var(--radius-md);background:var(--color-neutral-100);padding:7px 9px;display:flex;flex-direction:column;gap:4px"><span style="font-size:12.5px;font-weight:700;color:var(--color-neutral-700)">10</span><span style="font-size:11px;font-weight:600;padding:2px 7px;border-radius:999px;background:var(--color-neutral-200);color:var(--color-neutral-800);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">社内レビュー</span></div>
          <div style="border-radius:var(--radius-md);background:var(--color-neutral-100);padding:7px 9px"><span style="font-size:12.5px;font-weight:700;color:var(--color-neutral-700)">11</span></div>
          <div style="border-radius:var(--radius-md);background:var(--color-neutral-100);padding:7px 9px"><span style="font-size:12.5px;font-weight:700;color:var(--color-neutral-700)">12</span></div>
          <div style="border-radius:var(--radius-md);background:var(--color-neutral-100);padding:7px 9px"><span style="font-size:12.5px;font-weight:700;color:var(--color-neutral-700)">13</span></div>
          <div style="border-radius:var(--radius-md);background:var(--color-neutral-100);padding:7px 9px"><span style="font-size:12.5px;font-weight:700;color:var(--color-neutral-700)">14</span></div>
          <div style="border-radius:var(--radius-md);background:var(--color-neutral-100);padding:7px 9px"><span style="font-size:12.5px;font-weight:700;color:var(--color-neutral-700)">15</span></div>

          <div style="border-radius:var(--radius-md);background:var(--color-neutral-100);padding:7px 9px"><span style="font-size:12.5px;font-weight:700;color:var(--color-neutral-700)">16</span></div>
          <div style="border-radius:var(--radius-md);background:var(--color-neutral-100);padding:7px 9px"><span style="font-size:12.5px;font-weight:700;color:var(--color-neutral-700)">17</span></div>
          <div style="border-radius:var(--radius-md);background:var(--color-neutral-100);padding:7px 9px"><span style="font-size:12.5px;font-weight:700;color:var(--color-neutral-700)">18</span></div>
          <div style="border-radius:var(--radius-md);background:var(--color-neutral-100);padding:7px 9px"><span style="font-size:12.5px;font-weight:700;color:var(--color-neutral-700)">19</span></div>
          <div style="border-radius:var(--radius-md);background:var(--color-neutral-100);padding:7px 9px;display:flex;flex-direction:column;gap:4px"><span style="font-size:12.5px;font-weight:700;color:var(--color-neutral-700)">20</span><span style="font-size:11px;font-weight:600;padding:2px 7px;border-radius:999px;background:var(--color-accent-2-200);color:var(--color-accent-2-800);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">✓ 請求書の送付</span></div>
          <div style="border-radius:var(--radius-md);background:var(--color-neutral-100);padding:7px 9px"><span style="font-size:12.5px;font-weight:700;color:var(--color-neutral-700)">21</span></div>
          <div style="border-radius:var(--radius-md);background:var(--color-neutral-100);padding:7px 9px;display:flex;flex-direction:column;gap:4px"><span style="font-size:12.5px;font-weight:700;color:var(--color-neutral-700)">22</span><span style="font-size:11px;font-weight:600;padding:2px 7px;border-radius:999px;background:var(--color-accent-200);color:var(--color-accent-900);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">歯科の予約</span></div>

          <div style="border-radius:var(--radius-md);background:var(--color-neutral-100);padding:7px 9px"><span style="font-size:12.5px;font-weight:700;color:var(--color-neutral-700)">23</span></div>
          <div style="border-radius:var(--radius-md);background:var(--color-neutral-100);padding:7px 9px"><span style="font-size:12.5px;font-weight:700;color:var(--color-neutral-700)">24</span></div>
          <div style="border-radius:var(--radius-md);background:var(--color-neutral-100);padding:7px 9px;display:flex;flex-direction:column;gap:4px"><span style="font-size:12.5px;font-weight:700;color:var(--color-neutral-700)">25</span><span style="font-size:11px;font-weight:600;padding:2px 7px;border-radius:999px;background:var(--color-accent-200);color:var(--color-accent-900);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">見積書を作成</span></div>
          <div style="border-radius:var(--radius-md);background:var(--color-neutral-100);padding:7px 9px"><span style="font-size:12.5px;font-weight:700;color:var(--color-neutral-700)">26</span></div>
          <div style="border-radius:var(--radius-md);background:var(--color-neutral-100);padding:7px 9px;display:flex;flex-direction:column;gap:4px"><span style="font-size:12.5px;font-weight:700;color:var(--color-neutral-700)">27</span><span style="font-size:11px;font-weight:600;padding:2px 7px;border-radius:999px;background:var(--color-accent-200);color:var(--color-accent-900);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">経費を精算</span></div>
          <div style="border-radius:var(--radius-md);background:var(--color-neutral-100);padding:7px 9px"><span style="font-size:12.5px;font-weight:700;color:var(--color-neutral-700)">28</span></div>
          <div style="border-radius:var(--radius-md);background:var(--color-accent-100);padding:7px 9px;box-shadow:inset 0 0 0 2px var(--color-accent-400)"><span style="font-size:12.5px;font-weight:700;color:var(--color-accent-800)">29 今日</span></div>

          <div style="border-radius:var(--radius-md);background:var(--color-neutral-100);padding:7px 9px"><span style="font-size:12.5px;font-weight:700;color:var(--color-neutral-700)">30</span></div>
          <div style="border-radius:var(--radius-md);background:var(--color-neutral-100);padding:7px 9px;display:flex;flex-direction:column;gap:4px;box-shadow:inset 0 0 0 2px var(--color-accent-2-400)"><span style="font-size:12.5px;font-weight:700;color:var(--color-neutral-700)">31</span><span style="font-size:11px;font-weight:600;padding:2px 7px;border-radius:999px;background:var(--color-neutral-200);color:var(--color-neutral-800);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">週次ミーティング</span></div>
          <div style="border-radius:var(--radius-md);background:transparent;padding:7px 9px"><span style="font-size:12.5px;color:var(--color-neutral-400)">9/1</span></div>
          <div style="border-radius:var(--radius-md);background:transparent;padding:7px 9px"><span style="font-size:12.5px;color:var(--color-neutral-400)">2</span></div>
          <div style="border-radius:var(--radius-md);background:transparent;padding:7px 9px"><span style="font-size:12.5px;color:var(--color-neutral-400)">3</span></div>
          <div style="border-radius:var(--radius-md);background:transparent;padding:7px 9px"><span style="font-size:12.5px;color:var(--color-neutral-400)">4</span></div>
          <div style="border-radius:var(--radius-md);background:transparent;padding:7px 9px"><span style="font-size:12.5px;color:var(--color-neutral-400)">5</span></div>
        </div>
      </div>

      <div style="width:236px;display:flex;flex-direction:column;gap:var(--space-3);flex-shrink:0">
        <div style="background:var(--color-surface);border-radius:var(--radius-lg);padding:var(--space-4);display:flex;flex-direction:column;gap:var(--space-2)">
          <p style="font-family:var(--font-heading);font-size:19px;margin:0;color:var(--color-text)">8月31日（月）</p>
          <div style="display:flex;align-items:center;gap:var(--space-2);min-height:40px;padding:0 var(--space-3);border-radius:999px;background:var(--color-neutral-100)">
            <span style="width:17px;height:17px;border-radius:999px;border:2.75px solid var(--color-neutral-400);flex-shrink:0"></span>
            <span style="flex:1;font-size:13.5px;font-weight:600;color:var(--color-text)">週次ミーティングの議題整理</span>
          </div>
          <p style="font-size:12.5px;color:var(--color-neutral-700);margin:0">💼 仕事</p>
        </div>
        <div style="background:var(--color-accent-100);border-radius:var(--radius-lg);padding:var(--space-4);display:flex;flex-direction:column;gap:var(--space-2)">
          <p style="font-size:11.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--color-accent-800);margin:0">期限切れ · 3</p>
          <p style="font-size:12.5px;color:var(--color-accent-800);margin:0">見積書を作成 · 経費を精算 · 歯科の予約</p>
        </div>
        <div style="background:var(--color-neutral-100);border-radius:var(--radius-lg);padding:var(--space-4)">
          <p style="font-size:12.5px;color:var(--color-neutral-700);margin:0">期限が1週間以内のタスクは Discord に通知されます。</p>
        </div>
      </div>
    </div>
  </main>
</div>
</x-import>
</div>
</div>
<sc-if value="{{ showNext }}" hint-placeholder-val="{{ true }}">
<p class="dv-next">次に試せること：「<a class="dv-oid" href="#1g">1g</a>に週表示も追加」・「<a class="dv-oid" href="#1f">1f</a>にタスク追加のシートを追加」・「空・読み込み中の状態も」・「実装ハンドオフを作って」</p>
</sc-if>
</section>
</x-dc>
<script type="text/x-dc" data-dc-script data-props="{&quot;showAuth&quot;:{&quot;editor&quot;:&quot;boolean&quot;,&quot;default&quot;:true,&quot;tsType&quot;:&quot;boolean&quot;},&quot;userInitial&quot;:{&quot;editor&quot;:&quot;text&quot;,&quot;default&quot;:&quot;U&quot;,&quot;tsType&quot;:&quot;string&quot;},&quot;showNext&quot;:{&quot;editor&quot;:&quot;boolean&quot;,&quot;default&quot;:true,&quot;tsType&quot;:&quot;boolean&quot;}}">
class Component extends DCLogic {
  renderVals() {
    return {
      on: true,
      showAuth: this.props.showAuth ?? true,
      showNext: this.props.showNext ?? true,
      u: this.props.userInitial ?? 'U',
    };
  }
}
</script>
</body>
</html>
