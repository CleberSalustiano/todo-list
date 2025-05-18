import { useState, useEffect, useMemo } from "react"
import TaskList from "./components/TaskList"
import TaskForm from "./components/TaskForm"
import TabNavigation from "./components/TabNavigation"
import type { Task } from "./types/Task"
import { completeTask, createTask, getTasks, deleteTask } from "./service/taskService"

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("all")

  const fetchTasks = async () => {
    try {
      const tasks = await getTasks();
      setTasks(tasks)
    } catch (err) {
      console.error("Erro ao carregar tarefas:", err)
      setError("Erro ao carregar tarefas. Por favor, tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const addTask = async (title: string, description: string) => {
    try {
      const newTask = await createTask({ title, description });
      setTasks([...tasks, newTask])
      return true
    } catch (err) {
      console.error("Erro ao adicionar tarefa:", err)
      setError("Erro ao adicionar tarefa. Por favor, tente novamente.")
      return false
    }
  }

  const handleDeleteTask = async (id: number) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter((task) => task.id !== id))
    } catch (err) {
      console.error("Erro ao excluir tarefa:", err)
      setError("Erro ao excluir tarefa. Por favor, tente novamente.")
    }
  }

  const toggleTaskCompletion = async (id: number, completed: boolean) => {
    try {
      await completeTask(id, !completed)
      setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !completed } : task)))
    } catch (err) {
      console.error("Erro ao atualizar tarefa:", err)
      setError("Erro ao atualizar tarefa. Por favor, tente novamente.")
    }
  }

  const filteredTasks = useMemo(() => {
    switch (activeTab) {
      case "pending":
        return tasks.filter((task) => !task.completed)
      case "completed":
        return tasks.filter((task) => task.completed)
      default:
        return tasks
    }
  }, [tasks, activeTab])

  const getListTitle = () => {
    switch (activeTab) {
      case "pending":
        return "Tarefas Pendentes"
      case "completed":
        return "Tarefas Concluídas"
      default:
        return "Todas as Tarefas"
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-3xl min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Lista de Tarefas</h1>

      <TaskForm onAddTask={addTask} />

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md my-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      {isLoading ? (
        <div className="flex justify-center my-8">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      ) : (
        <TaskList
          tasks={filteredTasks}
          onDeleteTask={handleDeleteTask}
          onToggleCompletion={toggleTaskCompletion}
          title={getListTitle()}
        />
      )}
    </div>
  )
}

export default App
