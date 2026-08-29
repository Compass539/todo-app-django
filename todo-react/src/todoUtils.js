// 期限切れ判定（現行の規則を維持: 未完了 && due_date < 今日0時）
export function isOverdue(todo) {
  if (todo.completed || !todo.due_date) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(todo.due_date) < today;
}
