/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import {
  useDeleteTasksMutation,
  useGetTasksQuery,
  useUpdateTasksMutation,
} from "../api/apiSlice";
import NProgress from "nprogress";
import useMinimumFetchWaitTimeElapsed from "../utils/useMinimumFetchTimeElapsed";
import ListsAntd from "./ListsAntd";
import styles from "./Styles.module.css";
import { notification } from "antd";
import TaskModal from "./Task.modal";
import TaskForm from "./TaskForm";

const { componentStyles, labelStyles } = styles;

export const TasksList = () => {
  const [openNoteModal, setOpenNoteModal] = useState(false);

  const {
    data: tasks,
    isLoading,
    isFetching,
    isError,
    error,
    isSuccess,
  } = useGetTasksQuery({ refetchOnFocus: true, refetchOnReconnect: true });
  const [
    deleteTask,
    {
      isError: isDeleteError,
      error: errorOnDelete,
      isSuccess: isDeleteSuccess,
    },
  ] = useDeleteTasksMutation();
  const [
    updateTask,
    {
      isError: isErrorUpdate,
      error: errorOnUpdate,
      isSuccess: isSuccessUpdate,
    },
  ] = useUpdateTasksMutation();
  const minimumWaitTimeElapsed = useMinimumFetchWaitTimeElapsed(
    5000,
    isLoading
  );
  const [cargando, setCargando] = useState(false);
  const [ranonce, setRanonce] = useState(false);

  const loading = isLoading || isFetching;
  // var ranonce = useRef(false);

  useEffect(() => {
    if (isSuccess) NProgress.done();
    if (isDeleteSuccess && !loading)
      displayInfoAction(
        "Delete action completed",
        "Task deleted successfully."
      );
    if (isDeleteError && !loading) displayErrorAction(errorOnDelete);
    if (isSuccessUpdate && !loading && !isDeleteSuccess)
      displayInfoAction(
        "Update action completed",
        "Task updated successfully."
      );
    if (isErrorUpdate && !loading) displayErrorAction(errorOnUpdate);
    console.log("run useEffect");
  }, [loading]);

  return (
    <>
      <div className="1xl:max-w-[50rem] max-w-[5rem] mx-auto">
        <div className="m-8 grid grid-cols-[repeat(auto-fill,_320px)] gap-7 grid-rows-[1fr]">
          <div className="p-4 min-h-[8rem] bg-white rounded-lg border border-gray-200 shadow-md flex flex-col items-center justify-center">
            <div
              onClick={() => setOpenNoteModal(true)}
              className="flex items-center justify-center h-20 w-20 border-2 border-dashed border-ct-blue-600 rounded-full text-ct-blue-600 text-5xl cursor-pointer"
            >
              <i className="bx bx-plus"></i>
            </div>
            <h4
              onClick={() => setOpenNoteModal(true)}
              className="text-lg font-medium text-ct-blue-600 mt-5 cursor-pointer"
            >
              Add new task
            </h4>
          </div>
        </div>
      </div>
      <ListsAntd
        isLoading={isLoading}
        isError={isError}
        error={error}
        dataDisplay={tasks}
        updateTask={updateTask}
        deleteTask={deleteTask}
        cargando={cargando}
      />
      {/* Create Note Modal */}
      <TaskModal
        openNoteModal={openNoteModal}
        setOpenNoteModal={setOpenNoteModal}
      >
        <TaskForm setOpenNoteModal={setOpenNoteModal} />
      </TaskModal>
    </>
  );
};

/**
 * Description: displayInfoAction function
 * @param {any} msg
 * @returns {any}
 */
const displayInfoAction = (title, msg) => {
  notification.success({
    message: title,
    placement: "bottomRight",
    description: msg,
  });
  NProgress.done();
};

/**
 * Description: displayErrorAction function
 * @param {any} err
 * @returns {any}
 */
const displayErrorAction = (err) => {
  const resMessage =
    err.data.message || err.data.detail || err.message || err.toString();
  notification.error({
    message: "An error has ocurred",
    placement: "bottomRight",
    description: resMessage,
  });
  NProgress.done();
};
