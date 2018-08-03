import axios from "axios";
import { Container } from "unstated";
import { findIndex } from "lodash-es";
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

  loadTasks = () => {
    this.setState({ isLoading: true, tasks: [] });

    return axios
      .get("http://localhost:3000/tasks")
      .then(res => {
        this.setState({
          tasks: res.data,
          isLoading: false,
          error: undefined
        });
      })
      .catch(error => {
        this.setState({
          isLoading: false,
          error
        });
      });
  };

  updateTask = (task: ITask) =>
    axios
      .patch(`http://localhost:3000/tasks/${task.id}`, { ...task })
      .then(res => {
        this.setState(prevState => {
          const tasks = prevState.tasks.slice();
          const index = findIndex(tasks, { id: task.id });
          tasks[index] = res.data;

          return {
            tasks
          };
        });
      })
      .catch(error => {
        this.setState({
          error
        });
      });
}
