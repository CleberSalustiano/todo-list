import { Task } from "../types/Task"
import TaskItem from "./TaskItem"

interface TaskListProps {
  tasks: Task[]
  onDeleteTask: (id: number) => Promise<void>
  onToggleCompletion: (id: number, completed: boolean) => Promise<void>
  title?: string
}

const TaskList = ({ tasks, onDeleteTask, onToggleCompletion, title = "Suas Tarefas" }: TaskListProps) => {
  if (tasks.length === 0) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6 text-center" data-cy="empty-task-list">
        <p className="text-gray-500">Nenhuma tarefa encontrada nesta categoria.</p>
      </div>
    )
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden" data-cy="task-list">
      <h2 className="text-xl font-semibold p-4 border-b border-gray-200 text-gray-800">{title}</h2>
      <ul className="divide-y divide-gray-200">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} onDelete={onDeleteTask} onToggleCompletion={onToggleCompletion} />
        ))}
      </ul>
    </div>
  )
}

export default TaskList
