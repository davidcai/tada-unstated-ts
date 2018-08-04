import mockAxios from "axios";
import { ITask, TaskStore } from ".";

describe("TaskStore", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should have default state", () => {
    const taskStore = new TaskStore();
    const { tasks, isLoading, error } = taskStore.state;

    expect(tasks).toEqual([]);
    expect(isLoading).toBe(false);
    expect(error).toBeUndefined();
  });

  describe("loadTasks()", () => {
    it("should load tasks", async () => {
      const taskStore = new TaskStore();
      const spySetState = jest.spyOn(taskStore, "setState");
      const mockTasks: ITask[] = [
        { id: "1", name: "task1", isDone: false },
        { id: "2", name: "task2", isDone: true }
      ];

      (mockAxios.get as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({ data: mockTasks })
      );

      await taskStore.loadTasks();
      expect(spySetState.mock.calls).toMatchObject([
        [{ isLoading: true, tasks: [] }],
        [{ tasks: mockTasks, isLoading: false }]
      ]);

      const { tasks, isLoading, error } = taskStore.state;
      expect(tasks.length).toBe(mockTasks.length);
      expect(tasks).toMatchObject(mockTasks);
      expect(isLoading).toBe(false);
      expect(error).toBeUndefined();
    });

    it("should respond to error", async () => {
      const taskStore = new TaskStore();
      const spySetState = jest.spyOn(taskStore, "setState");
      const mockError = new Error("Blah!!!");

      (mockAxios.get as jest.Mock).mockImplementationOnce(() =>
        Promise.reject(mockError)
      );

      await taskStore.loadTasks();
      expect(spySetState.mock.calls).toMatchObject([
        [{ isLoading: true, tasks: [] }],
        [{ isLoading: false, error: mockError }]
      ]);
    });
  });

  describe("updateTask()", () => {
    it("should update a task", async () => {
      const taskStore = new TaskStore();
      const mockTasks: ITask[] = [
        { id: "1", name: "task1", isDone: false },
        { id: "2", name: "task2", isDone: true }
      ];
      const mockTask: ITask = {
        ...mockTasks[0],
        isDone: true
      };

      taskStore.setState({
        ...taskStore.state,
        tasks: mockTasks
      });

      (mockAxios.patch as jest.Mock).mockImplementationOnce((_, data) =>
        Promise.resolve({ data })
      );

      await taskStore.updateTask(mockTask);

      const { tasks } = taskStore.state;
      expect(tasks).toMatchObject([mockTask, mockTasks[1]]);
    });

    it("should respond to error", async () => {
      const taskStore = new TaskStore();
      const spySetState = jest.spyOn(taskStore, "setState");
      const mockError = new Error("Blah!!!");

      (mockAxios.patch as jest.Mock).mockImplementationOnce(() =>
        Promise.reject(mockError)
      );

      await taskStore.updateTask({ id: "1", name: "task1", isDone: false });
      expect(spySetState).toHaveBeenCalledWith({ error: mockError });
    });
  });
});
