import { AppError } from "../../../shared/errors/AppError";
import TaskService from "../domain/task.service";


describe("TaskService", () => {
  let taskRepositoryMock: any;
  let taskService: TaskService;

  const tasksMock = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    title: `Task ${i + 1}`,
    description: `Description for task ${i + 1}`,
    completed: i % 2 === 0, 
    createdAt: new Date(Date.now() - i * 1000 * 60),
    deletedAt: null,
  }));

  beforeEach(() => {
    taskRepositoryMock = {
      list: jest.fn(),
      create: jest.fn(),
      complete: jest.fn(),
      delete: jest.fn(),
      findOne: jest.fn(),
    };

    taskService = new TaskService(taskRepositoryMock);
  });

  describe("list", () => {
    it("should return the list of tasks with 10 items", async () => {
      taskRepositoryMock.list.mockResolvedValue(tasksMock);

      const result = await taskService.list();

      expect(result).toHaveLength(10);
      expect(result).toEqual(tasksMock);
      expect(taskRepositoryMock.list).toHaveBeenCalled();
    });
  });

  describe("create", () => {
    it("should throw error if title or description is missing", async () => {
      await expect(taskService.create({ title: "", description: "" })).rejects.toThrow(AppError);
      await expect(taskService.create({ title: "Title", description: "" })).rejects.toThrow(AppError);
      await expect(taskService.create({ title: "", description: "Desc" })).rejects.toThrow(AppError);
    });

    it("should create a task when valid data is provided", async () => {
      const dto = { title: "Title", description: "Desc" };
      const createdTask = { id: 11, ...dto, completed: false, createdAt: new Date(), deletedAt: null };
      taskRepositoryMock.create.mockResolvedValue(createdTask);

      const result = await taskService.create(dto);

      expect(result).toEqual(createdTask);
      expect(taskRepositoryMock.create).toHaveBeenCalledWith(dto.title, dto.description);
    });
  });

  describe("complete", () => {
    it("should throw error if id or completed are missing", async () => {
      await expect(taskService.complete({ id: undefined as any, completed: true })).rejects.toThrow(AppError);
      await expect(taskService.complete({ id: 1, completed: undefined as any })).rejects.toThrow(AppError);
    });

    it("should throw error if id is not a number", async () => {
      await expect(taskService.complete({ id: NaN, completed: true })).rejects.toThrow(AppError);
    });

    it("should throw error if task not found", async () => {
      taskRepositoryMock.findOne.mockResolvedValue(null);

      await expect(taskService.complete({ id: 1, completed: true })).rejects.toThrow(AppError);
    });

    it("should update task completion status", async () => {
      const task = tasksMock[0]; 
      taskRepositoryMock.findOne.mockResolvedValue(task);
      const updatedTask = { ...task, completed: true };
      taskRepositoryMock.complete.mockResolvedValue(updatedTask);

      const result = await taskService.complete({ id: task.id, completed: true });

      expect(result).toEqual(updatedTask);
      expect(taskRepositoryMock.complete).toHaveBeenCalledWith(task.id, true);
    });
  });

  describe("delete", () => {
    it("should throw error if id is not a number", async () => {
      await expect(taskService.delete(NaN)).rejects.toThrow(AppError);
    });

    it("should throw error if task not found", async () => {
      taskRepositoryMock.findOne.mockResolvedValue(null);
      await expect(taskService.delete(1)).rejects.toThrow(AppError);
    });

    it("should delete the task if found", async () => {
      const task = tasksMock[1];
      taskRepositoryMock.findOne.mockResolvedValue(task);
      taskRepositoryMock.delete.mockResolvedValue();

      const result = await taskService.delete(task.id);

      expect(taskRepositoryMock.delete).toHaveBeenCalledWith(task.id);
      expect(result).toEqual({ message: "Task deleted" });
    });
  });
});
