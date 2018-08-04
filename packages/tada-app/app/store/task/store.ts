import axios from "axios";
import { Container } from "unstated";
import { ITask } from "./types";

export interface ITaskStoreState {
  tasks: ITask[];
  isLoading: boolean;
  error?: Error;
}

export interface ITaskStoreService {
  loadTasks: () => any;
  updateTask: (task: ITask) => any;
}

export class TaskStore extends Container<ITaskStoreState>
  implements ITaskStoreService {
  state = {
    tasks: [],
    isLoading: false,
    error: undefined
  };

  loadTasks = async () => {
    this.setState({ isLoading: true, tasks: [] });

    try {
      const { data } = await axios.get("http://localhost:3000/tasks");
      this.setState({
        tasks: data,
        isLoading: false,
        error: undefined
      });
    } catch (error) {
      this.setState({
        isLoading: false,
        error
      });
    }
  };

  updateTask = async (task: ITask) => {
    try {
      const { data } = await axios.patch(
        `http://localhost:3000/tasks/${task.id}`,
        task
      );
      this.setState(prevState => {
        const tasks = prevState.tasks.slice();
        const index = tasks.findIndex(t => t.id === task.id);
        tasks[index] = data;

        return { tasks };
      });
    } catch (error) {
      this.setState({ error });
    }
  };
}
