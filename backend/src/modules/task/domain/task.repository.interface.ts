import ITask from "./task.entity"

export default interface ITaskRepository{
  create(title: string, description: string): Promise<ITask>
  complete(id: number, completed: boolean): Promise<ITask>
  delete(id: number): Promise<void>
  list(): Promise<ITask[]>
  findOne(id: number): Promise<ITask | null>
}