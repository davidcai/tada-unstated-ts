import * as React from "react";
import { Subscribe } from "unstated";
import {
  ITask,
  ITaskStoreState,
  ITaskStoreService,
  TaskStore
} from "../../store/task";
import { Task } from "./Task";

interface IProps extends ITaskStoreState, ITaskStoreService {}

export class TaskList extends React.PureComponent<IProps> {
  static defaultProps: Partial<IProps> = {
    tasks: [],
    isLoading: false,
    error: undefined
  };

  componentDidMount() {
    this.props.loadTasks();
  }

  handleToggle = (task: ITask) => {
    this.props.updateTask({
      ...task,
      isDone: !task.isDone
    });
  };

  render() {
    const { tasks, isLoading, error } = this.props;

    if (isLoading) {
      return <p>Please wait ...</p>;
    }

    if (error) {
      return <p>{error.message}</p>;
    }

    return (
      <ul>
        {tasks &&
          tasks.map(task => (
            <li key={task.id}>
              <Task task={task} onChange={() => this.handleToggle(task)} />
            </li>
          ))}
      </ul>
    );
  }
}

export const TaskListContainer: React.SFC = () => (
  <Subscribe to={[TaskStore]}>
    {(taskStore: TaskStore) => (
      <TaskList
        {...taskStore.state}
        loadTasks={taskStore.loadTasks}
        updateTask={taskStore.updateTask}
      />
    )}
  </Subscribe>
);
