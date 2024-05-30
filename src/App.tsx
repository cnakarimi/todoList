import { useState } from "react";
import "./App.scss";
import Content from "./Content";
import Header from "./Header";

function App() {
  const [tasksAmount, setTasksAmount] = useState(0);
  const getNumberOfTasks = (quantity: number) => {
    setTasksAmount(quantity);
  };
  return (
    <>
      <Header quantity={tasksAmount} />
      <Content countTasks={getNumberOfTasks} />
    </>
  );
}

export default App;
