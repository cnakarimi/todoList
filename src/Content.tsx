import { useState, ChangeEvent } from "react";
import {
  AiOutlineCheck,
  AiOutlineEdit,
  AiTwotoneDelete,
  AiOutlineMenu,
  AiOutlineClose,
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
    const newTask = { taskName: task, completed: false, id: uuid() };
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

  const taskCompletedHandler = (selectedTodo: Task) => {
    const newTodos = todoList.map((todo) =>
      todo === selectedTodo ? { ...todo, completed: !todo.completed } : todo
    );
    setTodoList(newTodos);
  };

  const editTodo = (id: string, newText: string) => {
    const updateTodos = todoList.map((todo) => {
      if (todo.id === id) {
        return { ...todo, taskName: newText };
      }
      return todo;
    });
    setTodoList(updateTodos);
    console.log(updateTodos);
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
        {!todo.completed && (
          <AiOutlineCheck
            className="mr-2	cursor-pointer"
            onClick={() => {
              taskCompletedHandler(todo);
            }}
          />
        )}
        {todo.completed && (
          <AiOutlineClose
            className="mr-2	cursor-pointer"
            onClick={() => {
              taskCompletedHandler(todo);
            }}
          />
        )}
        <AiOutlineEdit
          className="mr-2	cursor-pointer"
          onClick={(e) => editTodo(todo.id, e.target.value)}
        />
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
