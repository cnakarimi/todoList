import { ChangeEvent, useState } from "react";
import uuid from "react-uuid";
import { Task } from "./Interface";

export default function Input({ addTodo }) {
  const [task, setTask] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setTask(event.target.value);
  };

  const addTask = (): void => {
    const newTask = {
      taskName: task,
      completed: false,
      id: uuid(),
      showTask: false,
    };
    setTask("");
    addTodo(newTask);
  };

  return (
    <div className="w-1/2 ">
      <input
        className=" w-3/4 h-10 list rounded-xl px-3 placeholder-white"
        type="text"
        name="task"
        placeholder="Enter a new Task"
        value={task}
        onChange={handleChange}
      />

      <button
        onClick={addTask}
        type="submit"
        className="bg-fifth text-white rounded-xl py-2 px-2 ml-4"
      >
        Add
      </button>
    </div>
  );
}
