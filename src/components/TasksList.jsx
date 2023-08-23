// import React from 'react'
import { useEffect } from "react";

import {
  useDeleteTasksMutation,
  useGetTasksQuery,
  useUpdateTasksMutation,
} from "../api/apiSlice";
import Loading from "../features/Loading";

export const TasksList = () => {
  const { data: tasks, isLoading, isError, error } = useGetTasksQuery();
  const [deleteTask] = useDeleteTasksMutation();
  const [updateTask] = useUpdateTasksMutation();

  useEffect(() => {
    const handleOnlineEvent = () => {
      // Refetch data from the API when the online event is fired
      //refetch();
    };

    window.addEventListener("online", handleOnlineEvent);

    return () => {
      window.removeEventListener("online", handleOnlineEvent);
    };
  }, []);

  if (!navigator.onLine) {
    return (
      <div>
        <p>
          You are currently offline. Please check your internet connection and
          try again.
        </p>
      </div>
    );
  }

  if (isLoading)
    return (
      <div className="center">
        Loading...
        <Loading type="spinningBubbles" color="#202020" />
      </div>
    );
  else if (isError)
    return (
      <div>
        Error: {error.status} - {JSON.stringify(error.data.message)}
      </div>
    );

  // console.log(data);

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <h3>{task.name}</h3>
          <p>{task.description}</p>
          <button
            onClick={() => {
              deleteTask(task.id);
            }}
          >
            Delete
          </button>
          <input
            type="checkbox"
            checked={task.completed}
            id={task.id}
            onChange={(e) => {
              updateTask({
                ...task,
                completed: e.target.checked,
              });
            }}
          ></input>
          <label htmlFor={task.id}>completed</label>
        </li>
      ))}
    </ul>
  );
};
