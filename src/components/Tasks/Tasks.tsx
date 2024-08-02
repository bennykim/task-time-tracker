import { useCallback, useContext, useState } from "react";

import { CheckBox } from "@/components";
import { TaskTimerContext } from "@/provider";
import {
  formatRemainingTime,
  getCurrentDateTime,
  isClick,
  isEnterKey,
} from "@/utils";

type TaskProps = {
  onClear: (props: Task[]) => void;
};

export const Tasks = ({ onClear }: TaskProps) => {
  const { tasks, updateTasks } = useContext(TaskTimerContext);
  const [newTask, setNewTask] = useState("");
  const [focusTask, setFocusTask] = useState<{
    id: Task["id"];
    text: Task["text"];
  }>({ id: 0, text: "" });

  const addTask = useCallback(
    (e: TaskEvent) => {
      if (isEnterKey(e) || isClick(e)) {
        if (!newTask.trim()) return;

        const newTaskItem = {
          id: Date.now(),
          text: newTask,
          completed: false,
          createdAt: getCurrentDateTime(),
          totalDuration: 0,
        };

        updateTasks([...tasks, newTaskItem]);
        setNewTask("");
      }
    },
    [newTask, tasks, updateTasks]
  );

  const deleteTask = useCallback(
    (id: Task["id"]) => () => {
      const filteredTasks = tasks.filter((task) => task.id !== id);
      updateTasks(filteredTasks);
    },
    [tasks, updateTasks]
  );

  const toggleTaskCompleted = useCallback(
    (id: Task["id"]) => () => {
      const updatedTasks = tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );
      updateTasks(updatedTasks);
    },
    [tasks, updateTasks]
  );

  const clearCompletedTasks = useCallback(() => {
    const incompleteTasks = tasks.filter((task) => !task.completed);
    const completedTasks = tasks.filter((task) => task.completed);
    updateTasks(incompleteTasks);
    onClear(completedTasks);
  }, [tasks, updateTasks, onClear]);

  const updateTaskTitle = useCallback(
    (e: TaskEvent) => {
      if (isEnterKey(e) || isClick(e)) {
        const { id, text } = focusTask;
        if (!text.trim()) return;

        const updatedTasks = tasks.map((task) =>
          task.id === id ? { ...task, text } : task
        );
        updateTasks(updatedTasks);
        clearFocusTask();
      }
    },
    [focusTask, tasks, updateTasks]
  );

  const changeNewTaskInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(e.target.value);
  };

  const changeTaskTitleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFocusTask({ id: focusTask.id, text: e.target.value });
  };

  const focusOnTask = (id: Task["id"], text: Task["text"]) => () => {
    setFocusTask({ id, text });
  };

  const clearFocusTask = () => {
    setFocusTask({ id: 0, text: "" });
  };

  return (
    <div className="container">
      <div className="field has-addons">
        <div className="control is-expanded">
          <input
            className="input"
            type="text"
            placeholder="Add a new task"
            value={newTask}
            onChange={changeNewTaskInput}
            onKeyDown={addTask}
          />
        </div>
        <div className="control">
          <button
            className="button has-background-primary-40 has-text-primary-00 has-text-weight-semibold"
            onClick={addTask}
          >
            Add Task
          </button>
        </div>
      </div>
      <div>
        {tasks.length > 0 ? (
          <ul className="is-flex is-flex-direction-column is-gap-1">
            {tasks.map((task) => (
              <li key={task.id}>
                <div className="box is-flex is-align-items-center is-justify-content-between is-gap-1">
                  <CheckBox
                    checked={task.completed}
                    onChange={toggleTaskCompleted(task.id)}
                  />
                  {focusTask.id === task.id ? (
                    <input
                      className="input max-w-400"
                      type="text"
                      value={focusTask.text}
                      onChange={changeTaskTitleInput}
                      onKeyDown={updateTaskTitle}
                      onBlur={clearFocusTask}
                      autoFocus
                    />
                  ) : (
                    <p
                      className="has-text-primary-100 has-text-weight-semibold is-size-5 max-w-400"
                      style={{
                        textShadow: "0.05em 0.05em 0.1em rgba(0, 0, 0, 0.5)",
                      }}
                      onClick={focusOnTask(task.id, task.text)}
                    >
                      {task.text}
                    </p>
                  )}
                  <p className="is-flex is-align-items-center has-text-primary-00 ml-auto is-gap-1">
                    <span className="has-text-weight-medium is-size-7">
                      Created
                    </span>
                    <span className="has-text-weight-medium">
                      {task.createdAt}
                    </span>
                    <span className="has-text-weight-medium has-text-primary-100 is-size-7">
                      |
                    </span>
                    <span className="has-text-weight-medium is-size-7">
                      Session
                    </span>
                    <span className="has-text-weight-medium">
                      {formatRemainingTime(task.totalDuration)}
                    </span>
                    <button
                      className="delete is-small"
                      onClick={deleteTask(task.id)}
                      aria-label="Delete task"
                    />
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="box has-text-centered has-text-primary-00 has-text-weight-semibold has-background-primary-40">
            No tasks added yet.
          </p>
        )}
      </div>
      {tasks.some((task) => task.completed) && (
        <button
          className="button is-link is-pulled-right mt-4 is-fullwidth is-medium"
          onClick={clearCompletedTasks}
        >
          Save and Remove Completed
        </button>
      )}
    </div>
  );
};
