/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// import React from 'react'
// import { useEffect } from "react";
import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  List,
  Skeleton,
  Space,
  Checkbox,
  Popconfirm,
  BackTop,
} from "antd";
import {
  LikeOutlined,
  MessageOutlined,
  StarOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";

import {
  useDeleteTasksMutation,
  useGetTasksQuery,
  useUpdateTasksMutation,
} from "../api/apiSlice";
import Loading from "../features/Loading";
import IconText from "../features/IconText";
import image from "../assets/images.jpeg";
import NProgress from "nprogress";
import useMinimumFetchWaitTimeElapsed from "../utils/useMinimumFetchTimeElapsed";

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
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [cargando, setCargando] = useState(false);

  const style = {
    height: 40,
    width: 40,
    lineHeight: "40px",
    borderRadius: 4,
    backgroundColor: "#1088e9",
    color: "#fff",
    textAlign: "center",
    fontSize: 14,
  };

  const loading = isLoading || isFetching;

  useEffect(() => {
    if (isSuccess) {
      NProgress.done();
    }
    // const handleOnlineEvent = () => {
    //   // Refetch data from the API when the online event is fired
    //   //refetch();
    // };
    // window.addEventListener("online", handleOnlineEvent);
    // return () => {
    //   window.removeEventListener("online", handleOnlineEvent);
    // };
  }, [loading]);

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
      <>
        <br />
        <br />
        <Skeleton
          title={false}
          loading={isLoading}
          active
          paragraph={{
            rows: 10,
          }}
        ></Skeleton>
      </>
      // <div className="center">
      //   Loading...
      //   <Loading type="spinningBubbles" color="#202020" />
      // </div>
    );
  // else if (isSuccess) return NProgress.done();
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

  const confirm = (e) => {
    console.log(e);
  };

  console.log(dataDisplay);

  return (
    <>
      <List
        itemLayout="vertical"
        // loading={isLoading}
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 3,
        }}
        dataSource={dataDisplay}
        header={<div>Tasks List</div>}
        footer={
          <div>
            <b>Ant Design ©2023</b> Created by potlitel
          </div>
        }
        renderItem={(item) => (
          <List.Item
            key={item.id}
            actions={[
              <Checkbox
                key="chk"
                checked={item.completed}
                onChange={(e) => {
                  updateTask({
                    ...item,
                    completed: e.target.checked,
                  });
                }}
              >
                Completed
              </Checkbox>,
              <Popconfirm
                key="popConfirm"
                title="Delete the task"
                description="Are you sure to delete this task?"
                onConfirm={() => deleteTask(item.id)}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  key="btnDelete"
                  type="primary"
                  icon={<PoweroffOutlined />}
                />
              </Popconfirm>,
            ]}
            extra={!cargando && <img width={100} alt="logo" src={image} />}
          >
            <Skeleton avatar title={false} loading={cargando} active>
              <List.Item.Meta
                // avatar={<Avatar src={item.avatar} />}
                title={<a href="#">{item.name}</a>}
                description={item.description}
              />
              {/* {item.content} */}
            </Skeleton>
          </List.Item>
        )}
      />
      {/* <BackTop>
        <div style={style}>UP</div>
      </BackTop> */}
      {/* <ul>
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
      </ul> */}
    </>
  );
};
