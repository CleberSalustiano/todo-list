import { Task } from "../types/Task";
import api from "./api";

interface ICreateTaskPayload {
  title: string;
  description: string;
}

export const getTasks = async () => {
  const response = await api.get("/tasks")
  const tasks = response.data as Task[]
  return tasks;
}

export const createTask = async (payload: ICreateTaskPayload) => {
  const response = await api.post("/tasks", payload)
  return response.data as Task;
}

export const completeTask = async (id: number, completed: boolean) => {
  const response = await api.patch(`/tasks/${id}`, {completed})
  return response.data as Task;
}

export const deleteTask = async (id: number) => {
  const response = await api.delete(`/tasks/${id}`)
  return response.data
}