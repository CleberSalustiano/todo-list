export default interface ITask {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  deletedAt: Date | null;  
}
