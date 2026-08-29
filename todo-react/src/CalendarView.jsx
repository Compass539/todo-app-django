import { isOverdue } from './todoUtils';
import { btnPrimaryClass } from './ui';

const WEEKDAYS = ['日', '月', '火', '水', '木', '金', '土'];

function toDateKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function isSameDay(a, b) {
  return a && b && toDateKey(a) === toDateKey(b);
}

function buildMonthCells(calendarMonth) {
  const year = calendarMonth.getFullYear();
  const month = calendarMonth.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const leadingBlanks = new Date(year, month, 1).getDay();

  const cells = Array.from({ length: leadingBlanks }, () => null);
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ date: new Date(year, month, d), inMonth: true });
  }
  while (cells.length % 7 !== 0) {
    const prev = cells[cells.length - 1].date;
    const next = new Date(prev);
    next.setDate(next.getDate() + 1);
    cells.push({ date: next, inMonth: false });
  }
  return cells;
}

function taskChipClass(todo) {
  if (todo.completed) return 'bg-accent-2-200 text-accent-2-800';
  if (isOverdue(todo)) return 'bg-accent-200 text-accent-900';
  return 'bg-neutral-200 text-neutral-800';
}

function CalendarView({ todos, calendarMonth, onChangeMonth, selectedDate, onSelectDate, onToggle, onAddClick }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tasksByDate = todos.reduce((acc, todo) => {
    if (!todo.due_date) return acc;
    (acc[todo.due_date] ??= []).push(todo);
    return acc;
  }, {});

  const cells = buildMonthCells(calendarMonth);
  const selectedTasks = selectedDate ? tasksByDate[toDateKey(selectedDate)] ?? [] : [];
  const overdueTasks = todos.filter(isOverdue);

  function goToMonth(delta) {
    onChangeMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + delta, 1));
  }

  return (
    <main className="flex min-w-0 flex-1 flex-col overflow-hidden px-4 pt-4 md:px-6 md:pt-6">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div className="flex items-baseline gap-4">
          <h1 className="m-0 font-heading text-[32px] leading-none text-text">
            {calendarMonth.getFullYear()}年 {calendarMonth.getMonth() + 1}月
          </h1>
          <div className="flex gap-1">
            <button
              type="button"
              onClick={() => goToMonth(-1)}
              title="前の月"
              className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-neutral-100 text-[14px] text-neutral-700"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => goToMonth(1)}
              title="次の月"
              className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-neutral-100 text-[14px] text-neutral-700"
            >
              ›
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex rounded-full bg-neutral-100 p-[3px]">
            <span className="rounded-full bg-accent-500 px-4 py-1.5 text-[13px] font-bold text-white">月</span>
            <span className="px-4 py-1.5 text-[13px] text-neutral-700">週</span>
            <span className="px-4 py-1.5 text-[13px] text-neutral-700">リスト</span>
          </div>
          <button type="button" onClick={onAddClick} className={btnPrimaryClass}>
            ＋ タスクを追加
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 overflow-hidden md:flex-row">
        <div className="flex min-w-0 flex-1 flex-col gap-1.5 overflow-y-auto pb-4">
          <div className="grid grid-cols-7 gap-1.5">
            {WEEKDAYS.map((w, i) => (
              <span
                key={w}
                className={`text-center text-[11.5px] font-bold ${
                  i === 0 ? 'text-accent-700' : i === 6 ? 'text-accent-2-700' : 'text-neutral-600'
                }`}
              >
                {w}
              </span>
            ))}
          </div>
          <div className="grid flex-1 auto-rows-fr grid-cols-7 gap-1.5">
            {cells.map((cell, i) => {
              if (!cell) return <div key={`blank-${i}`} className="rounded-md" />;

              const key = toDateKey(cell.date);
              const dayTasks = tasksByDate[key] ?? [];
              const isToday = cell.inMonth && isSameDay(cell.date, today);
              const isSelected = isSameDay(cell.date, selectedDate);

              const shown = dayTasks.slice(0, 2);
              const hiddenCount = dayTasks.length - shown.length;

              const bgClass = isToday ? 'bg-accent-100' : cell.inMonth ? 'bg-neutral-100' : 'bg-transparent';
              const ringClass = isToday
                ? 'shadow-[inset_0_0_0_2px_var(--color-accent-400)]'
                : isSelected
                  ? 'shadow-[inset_0_0_0_2px_var(--color-accent-2-400)]'
                  : '';

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => onSelectDate(cell.date)}
                  className={`flex flex-col items-start gap-1 rounded-md p-[7px_9px] text-left ${bgClass} ${ringClass}`}
                >
                  <span
                    className={`text-[12.5px] font-bold ${
                      cell.inMonth ? (isToday ? 'text-accent-800' : 'text-neutral-700') : 'text-neutral-400'
                    }`}
                  >
                    {cell.date.getDate()}
                    {isToday ? ' 今日' : ''}
                  </span>
                  {shown.map((todo) => (
                    <span
                      key={todo.id}
                      className={`w-full truncate rounded-full px-[7px] py-[2px] text-[11px] font-semibold ${taskChipClass(todo)}`}
                    >
                      {todo.completed ? '✓ ' : ''}
                      {todo.title}
                    </span>
                  ))}
                  {hiddenCount > 0 && (
                    <span className="text-[11px] font-semibold text-neutral-600">+{hiddenCount}件</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex w-full shrink-0 flex-col gap-3 pb-4 md:w-[236px]">
          <div className="flex flex-col gap-2 rounded-lg bg-surface p-4">
            <p className="m-0 font-heading text-[19px] text-text">
              {selectedDate
                ? `${selectedDate.getMonth() + 1}月${selectedDate.getDate()}日（${WEEKDAYS[selectedDate.getDay()]}）`
                : '日付を選択してください'}
            </p>
            {selectedTasks.length === 0 ? (
              <p className="m-0 text-[12.5px] text-neutral-700">タスクがありません</p>
            ) : (
              selectedTasks.map((todo) => (
                <div key={todo.id} className="flex flex-col gap-1">
                  <div className="flex min-h-[40px] items-center gap-2 rounded-full bg-neutral-100 px-3">
                    <button
                      type="button"
                      onClick={() => onToggle(todo)}
                      className={`flex h-[17px] w-[17px] shrink-0 items-center justify-center rounded-full text-[10px] text-white ${
                        todo.completed ? 'bg-accent-2-500' : 'border-[2.75px] border-neutral-400'
                      }`}
                    >
                      {todo.completed && '✓'}
                    </button>
                    <span
                      className={`flex-1 truncate text-[13.5px] font-semibold ${
                        todo.completed ? 'text-accent-2-800 line-through' : 'text-text'
                      }`}
                    >
                      {todo.title}
                    </span>
                  </div>
                  <p className="m-0 pl-1 text-[12.5px] text-neutral-700">{todo.category || 'カテゴリなし'}</p>
                </div>
              ))
            )}
          </div>

          {overdueTasks.length > 0 && (
            <div className="flex flex-col gap-2 rounded-lg bg-accent-100 p-4">
              <p className="m-0 text-[11.5px] font-bold uppercase tracking-[.08em] text-accent-800">
                期限切れ · {overdueTasks.length}
              </p>
              <p className="m-0 text-[12.5px] text-accent-800">
                {overdueTasks.map((t) => t.title).join(' · ')}
              </p>
            </div>
          )}

          <div className="rounded-lg bg-neutral-100 p-4">
            <p className="m-0 text-[12.5px] text-neutral-700">期限が1週間以内のタスクは Discord に通知されます。</p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default CalendarView;
