import { useState, ChangeEvent, useEffect } from "react";
import {
  AiOutlineCheck,
  AiOutlineEdit,
  AiTwotoneDelete,
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineArrowRight,
} from "react-icons/ai";
import { Task } from "./Interface";
import { Reorder } from "framer-motion";
import Input from "./Input";

export default function Content({ countTasks }) {
  const [todoList, setTodoList] = useState<Task[]>([]);

  const addTodo = (newTodo: Task) => {
    const updatedTodoList = [...todoList, newTodo];
    setTodoList(updatedTodoList);
    localStorage.setItem("todoList", JSON.stringify(updatedTodoList));
  };

  useEffect(() => {
    const storedItems = localStorage.getItem("todoList");

    if (storedItems) {
      const parsedItems: Task[] = JSON.parse(storedItems);
      setTodoList(parsedItems);
    }
  }, []);

  useEffect(() => {
    countTasks(todoList.length);
  });

  const deleteTask = (taskId: string): void => {
    const updatedTodoList = todoList.filter((task) => task.id !== taskId);
    setTodoList(updatedTodoList);
    localStorage.setItem("todoList", JSON.stringify(updatedTodoList));
  };

  const taskCompletedHandler = (selectedTodo: Task) => {
    const newTodos = todoList.map((todo) =>
      todo === selectedTodo ? { ...todo, completed: !todo.completed } : todo
    );
    setTodoList(newTodos);
    localStorage.setItem("todoList", JSON.stringify(newTodos));
  };

  const showInputHandler = (selectedTodoId: string) => {
    const newTodos = todoList.map((todo) =>
      todo.id === selectedTodoId ? { ...todo, showTask: !todo.showTask } : todo
    );
    setTodoList(newTodos);
  };

  const editTodo = (editedText: string, todoId: string) => {
    const updatedTodos = todoList.map((todo) => {
      if (todo.id === todoId) {
        return { ...todo, taskName: editedText };
      }
      return todo;
    });
    setTodoList(updatedTodos);
    localStorage.setItem("todoList", JSON.stringify(updatedTodos));
  };

  const todos = todoList.map((todo) => (
    <>
      <Reorder.Item
        key={todo.id}
        value={todo}
        className="text-fourth border-b-2 border-secondary py-3 flex justify-between"
      >
        <p className="pl-5 relative">
          {todo.taskName}
          {todo.completed && <p className="border absolute top-1/2 w-full"></p>}
        </p>

        <div className="flex pr-5">
          {!todo.completed ? (
            <AiOutlineCheck
              className="mr-2	cursor-pointer"
              onClick={() => {
                taskCompletedHandler(todo);
              }}
            />
          ) : (
            <AiOutlineClose
              className="mr-2	cursor-pointer"
              onClick={() => {
                taskCompletedHandler(todo);
              }}
            />
          )}
          <AiOutlineEdit
            className="mr-2	cursor-pointer"
            onClick={() => showInputHandler(todo.id)}
          />
          <AiTwotoneDelete
            className="mr-2	cursor-pointer"
            onClick={() => {
              deleteTask(todo.id);
            }}
          />
          <AiOutlineMenu className="mr-2	cursor-pointer" />
        </div>
      </Reorder.Item>

      {todo.showTask && (
        <div className="flex items-center mt-3">
          <AiOutlineArrowRight className="text-white rotate mx-2" />

          <input
            className=" w-1/2 h-10 list rounded-xl px-3 placeholder-white text-base"
            type="text"
            placeholder="Update Selected Task"
            value={todo.taskName}
            onChange={(e) => editTodo(e.target.value, todo.id)}
          />

          <button
            type="submit"
            className="bg-fifth text-white rounded-xl py-2 px-2 ml-4 text-base"
            onClick={() => showInputHandler(todo.id)}
          >
            Done
          </button>
        </div>
      )}
    </>
  ));

  return (
    <div className="flex flex-col items-center pt-24">
      <Input addTodo={addTodo} />
      <Reorder.Group
        axis="y"
        values={todoList}
        onReorder={setTodoList}
        className="w-2/3 mt-24 border rounded-md border-secondary text-3xl px-5 py-8"
      >
        {todos}
      </Reorder.Group>
    </div>
  );
}
