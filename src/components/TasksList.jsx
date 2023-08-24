/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  useDeleteTasksMutation,
  useGetTasksQuery,
  useUpdateTasksMutation,
} from "../api/apiSlice";
import NProgress from "nprogress";
import useMinimumFetchWaitTimeElapsed from "../utils/useMinimumFetchTimeElapsed";
import ListsAntd from "./ListsAntd";
import styles from "./Styles.module.css";
import SkeletonParagraph from "../features/SkeletonParagraph";

const { componentStyles, labelStyles } = styles;

export const TasksList = () => {
  const {
    data: tasks,
    isLoading,
    isFetching,
    isError,
    error,
    isSuccess,
  } = useGetTasksQuery({ refetchOnFocus: true, refetchOnReconnect: true });
  const [deleteTask] = useDeleteTasksMutation();
  const [updateTask] = useUpdateTasksMutation();
  const minimumWaitTimeElapsed = useMinimumFetchWaitTimeElapsed(
    5000,
    isLoading
  );
  const [cargando, setCargando] = useState(false);

  const loading = isLoading || isFetching;

  useEffect(() => {
    if (isSuccess) {
      NProgress.done();
    }
  }, [loading]);

  if (isLoading) return <SkeletonParagraph loading={isLoading} />;
  else if (isError)
    return (
      <div>
        Error: {error.status} - {JSON.stringify(error.data.message)}
      </div>
    );

  const dataDisplay = Array.from(tasks).map((_, i) => ({
    id: _.id,
    name: _.name,
    description: _.description,
    completed: _.completed,
  }));

  return (
    <ListsAntd
      dataDisplay={dataDisplay}
      updateTask={updateTask}
      deleteTask={deleteTask}
      cargando={cargando}
    />
  );
};
