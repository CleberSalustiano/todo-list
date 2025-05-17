import { useState } from "react"
import { Task } from "../types/Task"
import { formatDate } from "../utils/dateUtils"
import ConfirmModal from "./ConfirmModal"

interface TaskItemProps {
  task: Task
  onDelete: (id: number) => Promise<void>
  onToggleCompletion: (id: number, completed: boolean) => Promise<void>
}

const TaskItem = ({ task, onDelete, onToggleCompletion }: TaskItemProps) => {
  const [isDeleting, setIsDeleting] = useState(false)
  const [isToggling, setIsToggling] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)

  const handleDelete = async () => {
    setShowConfirmModal(true)
  }

  const handleConfirmDelete = async () => {
    setShowConfirmModal(false)
    setIsDeleting(true)
    await onDelete(task.id)
    setIsDeleting(false)
  }

  const handleCancelDelete = () => {
    setShowConfirmModal(false)
  }

  const handleToggleCompletion = async () => {
    setIsToggling(true)
    await onToggleCompletion(task.id, task.completed)
    setIsToggling(false)
  }

  return (
    <>
      <li className="p-4 hover:bg-gray-50 transition-colors duration-200" data-cy="task-item">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 pt-1">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={handleToggleCompletion}
              disabled={isToggling}
              className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 transition-colors duration-200"
              data-cy="task-checkbox"
            />
          </div>

          <div className="flex-1 min-w-0">
            <h3
              className={`text-lg font-medium ${task.completed ? "line-through text-gray-500" : "text-gray-900"}`}
              data-cy="task-title"
            >
              {task.title}
            </h3>

            {task.description && (
              <p
                className={`mt-1 text-sm ${task.completed ? "text-gray-400" : "text-gray-600"}`}
                data-cy="task-description"
              >
                {task.description}
              </p>
            )}

            <p className="mt-1 text-xs text-gray-500" data-cy="task-date">
              Criada em: {formatDate(task.createdAt)}
            </p>
          </div>

          <div className="flex-shrink-0">
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="text-red-600 hover:text-red-800 disabled:opacity-50 transition-colors duration-200"
              data-cy="delete-task-button"
            >
              {isDeleting ? "Excluindo..." : "Excluir"}
            </button>
          </div>
        </div>
      </li>

      <ConfirmModal
        isOpen={showConfirmModal}
        title="Excluir Tarefa"
        message="Tem certeza que deseja excluir esta tarefa? Esta ação não pode ser desfeita."
        confirmText="Excluir"
        cancelText="Cancelar"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </>
  )
}

export default TaskItem
