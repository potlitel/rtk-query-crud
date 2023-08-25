/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Button, List, Skeleton, Checkbox, Popconfirm, Typography } from "antd";
const { Text } = Typography;
import { DeleteOutlined } from "@ant-design/icons";
import image from "../assets/images.jpeg";
import SkeletonParagraph from "../features/SkeletonParagraph";
const ListsAntd = ({
  dataDisplay,
  updateTask,
  deleteTask,
  cargando,
  isLoading,
  isError,
  error,
}) => {
  if (isLoading) return <SkeletonParagraph loading={isLoading} />;
  else if (isError)
    return (
      <div>
        Error: {error.status} - {JSON.stringify(error.data.message)}
      </div>
    );

  // const dataDisplay1 = Array.from(dataDisplay).map((_, i) => ({
  //   id: _.id,
  //   name: _.name,
  //   description: _.description,
  //   completed: _.completed,
  // }));
  return (
    <>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 3,
        }}
        dataSource={dataDisplay}
        // header={

        // }
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
                {item.completed ? <Text delete>Completed</Text> : "Completed"}
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
                  danger
                  icon={<DeleteOutlined />}
                />
              </Popconfirm>,
            ]}
            extra={!cargando && <img width={100} alt="logo" src={image} />}
          >
            <Skeleton avatar title={false} loading={cargando} active>
              <List.Item.Meta
                title={<a href="#">{item.name}</a>}
                description={item.description}
              />
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

export default ListsAntd;
