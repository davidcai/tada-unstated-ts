import * as React from "react";
import { ITask } from "../../store/task";

interface IProps {
  task: ITask;
  onChange: () => any;
}

export const Task: React.SFC<IProps> = ({ task, onChange }) => {
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
