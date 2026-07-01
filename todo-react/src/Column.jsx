import Card from './Card';

function Column({ title, todos, onDelete, onToggle, onEdit }) {
  return (
    <div className="flex-1 min-w-[200px] bg-violet-50 rounded-xl p-4 border border-indigo-100">
      <h2 className="text-[15px] font-bold mb-3 pb-2 border-b-2 border-indigo-500 text-indigo-600">
        {title}
      </h2>
      <div>
        {todos.map((todo) => (
          <Card
            key={todo.id}
            todo={todo}
            onDelete={onDelete}
            onToggle={onToggle}
            onEdit={onEdit}
          />
        ))}
      </div>
    </div>
  );
}

export default Column;