/* eslint-disable react/prop-types */
import { Button, List, Skeleton, Checkbox, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import image from "../assets/images.jpeg";
const ListsAntd = ({ dataDisplay, updateTask, deleteTask, cargando }) => {
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