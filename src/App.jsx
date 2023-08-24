// import React from 'react'

import TaskForm from "./components/TaskForm";
import { TasksList } from "./components/TasksList";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <div id="container">
          <div id="header">
            <TaskForm />
            <TasksList />
          </div>
        </div>
      </Provider>
    </>
  );
};

export default App;
