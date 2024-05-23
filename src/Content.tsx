import { useState, ChangeEvent } from "react";
import {
  AiOutlineCheck,
  AiOutlineEdit,
  AiTwotoneDelete,
  AiOutlineMenu,
} from "react-icons/ai";
import { Task } from "./Interface";
import uuid from "react-uuid";

export default function Content() {
  const [task, setTask] = useState<string>("");
  const [todoList, setTodoList] = useState<Task[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setTask(event.target.value);
  };

  const addTask = (): void => {
    const newTask = { taskName: task, completed: isCompleted, id: uuid() };
    setTodoList([...todoList, newTask]);
    console.log(todoList);
    setTask("");
  };

  const deleteTask = (taskId: string): void => {
    setTodoList(
      todoList.filter((task) => {
        return task.id != taskId;
      })
    );
  };

  const todos = todoList.map((todo) => (
    <li
      key={todo.id}
      className="text-white border-b-2 border-secondary py-3 flex justify-between"
    >
      <p className="pl-5 relative">
        {todo.taskName}
        {todo.completed && <p className="border absolute top-1/2 w-full"></p>}
      </p>

      <div className="flex pr-5">
        <AiOutlineCheck
          className="mr-2	cursor-pointer"
          onClick={() => {
            completeHandler(todo.id);
          }}
        />
        <AiOutlineEdit className="mr-2	cursor-pointer" />
        <AiTwotoneDelete
          className="mr-2	cursor-pointer"
          onClick={() => {
            deleteTask(todo.id);
          }}
        />
        <AiOutlineMenu className="mr-2	cursor-pointer" />
      </div>
    </li>
  ));

  return (
    <div className="flex flex-col items-center pt-24">
      <div className="w-1/2 ">
        <input
          className=" w-3/4 h-10 bg-secondary rounded-xl px-3 placeholder-white"
          type="text"
          name="task"
          placeholder="Enter a new task"
          value={task}
          onChange={handleChange}
        />
        <button
          onClick={addTask}
          type="submit"
          className="bg-secondary rounded-xl py-2 px-2 ml-4"
        >
          Add
        </button>
      </div>
      <ul className="w-2/3 mt-24 border rounded-md border-secondary text-3xl px-5 py-8">
        {todos}
      </ul>
    </div>
  );
}
