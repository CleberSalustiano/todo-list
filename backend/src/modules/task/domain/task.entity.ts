export default interface ITask {
  id: number;
  title: string;
  description: string | null;
  completed: boolean;
  createdAt: Date;
  deletedAt: Date | null;  
}
