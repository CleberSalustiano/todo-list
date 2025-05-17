import { AppError } from "../../../shared/errors/AppError";
import { ICompleteTaskDTO, ICreateTaskDTO } from "./task.dto";
import TaskRepository from "./task.repository.interface";

export default class TaskService {

  constructor(private taskRepository: TaskRepository) {}

  async list() {
    return this.taskRepository.list();
  }
  
  async create(dto: ICreateTaskDTO) {
    if (!dto.title || !dto.description) {
      throw new AppError("Title and description are required", 400);
    }

    const task = await this.taskRepository.create(dto.title, dto.description);    

    return task;
  }

  async complete(dto: ICompleteTaskDTO) {
    const {id, completed} = dto;

    if (!id || completed === undefined) {
      throw new AppError("Id and completed are required", 400);
    }

    if (isNaN(id)) {
      throw new AppError("Invalid id", 400);
    }

    const task = await this.taskRepository.findOne(id);

    if (!task) {
      throw new AppError("Task not found", 404);
    }

    const taskUpdated = await this.taskRepository.complete(id, completed);
    return taskUpdated
  }

  async delete(id: number) {
    if (isNaN(id)) {
      throw new AppError("Invalid id", 400);
    }

    const task = await this.taskRepository.findOne(id);

    if (!task) {
      throw new AppError("Task not found", 404);
    }

    await this.taskRepository.delete(id);
    return {message: "Task deleted"}
  }



}