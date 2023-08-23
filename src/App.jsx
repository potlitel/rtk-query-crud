// import React from 'react'

import TaskForm from "./components/TaskForm";
import { TasksList } from "./components/TasksList";

const App = () => {
  return (
    <>
      <div id="container">
        <div id="header">
          <TaskForm />
          <TasksList />
        </div>
      </div>
    </>
  );
};

export default App;
