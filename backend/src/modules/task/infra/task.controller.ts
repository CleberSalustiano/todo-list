import { Request, Response, Router } from "express";
import TaskService from "../domain/task.service";
import TaskRepository from "./task.repository";

const taskController = Router();

const taskRepository = new TaskRepository();
const taskService = new TaskService(taskRepository);

taskController.get('/tasks', async (req: Request, res: Response) => {
  const tasks = await taskService.list();
  res.send(tasks);
})

taskController.post('/tasks', async (req: Request, res: Response) => {
  const {title, description} = req.body
  const response = await taskService.create({
    title,
    description
  });
  res.send(response);
})

taskController.patch('/tasks/:id',async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const {completed} = req.body
  const response = await taskService.complete({
    id,
    completed
  });
  res.send(response);
})

taskController.delete('/tasks/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const response = await taskService.delete(id);
  res.send(response);
})

export default taskController;