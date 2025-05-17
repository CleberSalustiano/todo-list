import React from "react"
import { useState } from "react"

interface TaskFormProps {
  onAddTask: (title: string, description: string) => Promise<boolean>
}

const TaskForm = ({ onAddTask }: TaskFormProps) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim()) {
      setError("O título da tarefa é obrigatório")
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const success = await onAddTask(title, description)
      if (success) {
        setTitle("")
        setDescription("")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6" data-cy="task-form">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Adicionar Nova Tarefa</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Título *
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            placeholder="Digite o título da tarefa"
            data-cy="task-title-input"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Descrição
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            rows={3}
            placeholder="Digite a descrição da tarefa (opcional)"
            data-cy="task-description-input"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          data-cy="add-task-button"
        >
          {isSubmitting ? "Adicionando..." : "Adicionar Tarefa"}
        </button>
      </form>
    </div>
  )
}

export default TaskForm
