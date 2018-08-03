import * as React from "react";
import { ITask } from "../../store/task";

interface ITaskProps {
  task: ITask;
  onChange: React.ChangeEventHandler;
}

export const Task: React.SFC<ITaskProps> = ({ task, onChange }) => {
  const id = `task-${task.id}`;

  return (
    <label htmlFor={id}>
      <input
        type="checkbox"
        id={id}
        checked={task.isDone}
        onChange={onChange}
      />
      {task.name}
    </label>
  );
};
