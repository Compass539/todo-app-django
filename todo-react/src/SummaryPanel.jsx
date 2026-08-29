// 右カラム：進捗リング・サマリー・通知説明（一覧画面用、幅236px固定）
function SummaryPanel({ totalCount, completedCount, overdueCount }) {
  const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const turn = totalCount > 0 ? completedCount / totalCount : 0;

  return (
    <div className="flex w-full shrink-0 flex-col gap-3 md:w-[236px]">
      <div className="flex flex-col items-center gap-2 rounded-lg bg-surface p-4">
        <div
          className="flex h-[120px] w-[120px] items-center justify-center rounded-full"
          style={{
            background: `conic-gradient(var(--color-accent-2-500) 0turn ${turn}turn, var(--color-neutral-300) ${turn}turn 1turn)`,
          }}
        >
          <div className="flex h-[88px] w-[88px] flex-col items-center justify-center rounded-full bg-surface">
            <span className="font-heading text-[26px] leading-none text-text">{percent}%</span>
            <span className="text-[11px] text-neutral-700">完了</span>
          </div>
        </div>
        <p className="m-0 text-center text-[13px] text-neutral-700">
          {totalCount}件のうち{completedCount}件が完了
        </p>
      </div>

      <div className="flex flex-col gap-2 rounded-lg bg-neutral-100 p-4">
        <p className="m-0 text-[11.5px] font-bold uppercase tracking-[.08em] text-neutral-600">サマリー</p>
        <div className="flex items-baseline justify-between">
          <span className="text-[13.5px] text-neutral-700">合計タスク</span>
          <span className="font-heading text-[19px] text-text">{totalCount}</span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="text-[13.5px] text-neutral-700">完了済み</span>
          <span className="font-heading text-[19px] text-accent-2-700">{completedCount}</span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="text-[13.5px] text-neutral-700">期限切れ</span>
          <span className="font-heading text-[19px] text-accent-700">{overdueCount}</span>
        </div>
      </div>

      <div className="rounded-lg bg-accent-100 p-4">
        <p className="m-0 text-[12.5px] text-accent-800">期限が1週間以内のタスクは Discord に通知されます。</p>
      </div>
    </div>
  );
}

export default SummaryPanel;
