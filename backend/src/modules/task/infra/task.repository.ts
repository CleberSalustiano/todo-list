import prismaClient from "../../../database/prismaClient";
import ITaskRepository from "../domain/task.repository.interface";

export default class TaskRepository implements ITaskRepository {
  async create(title: string, description: string) {
    const task = await prismaClient.task.create({
      data: {
        title,
        description,
        completed: false
      }
    })

    return task;
  }
  async complete(id: number, completed: boolean) {
    const taskUpdated = await prismaClient.task.update({
      where: { id },
      data: { completed }
    })

    return taskUpdated;
  }
  async delete(id: number) {
    await prismaClient.task.update({
      where: { id },
      data: { deletedAt: new Date() }
    })
    return;
  }
  async list() {
    return await prismaClient.task.findMany({where: {deletedAt: null}})
  }
  async findOne(id: number) {
    return await prismaClient.task.findUnique({ where: { id, deletedAt: null } });
  }
}