export interface ICreateTaskDTO {
  title: string;
  description: string;
}

export interface ICompleteTaskDTO {
  id: number;
  completed: boolean
}