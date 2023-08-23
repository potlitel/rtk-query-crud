/* eslint-disable no-unused-vars */
import { useCreateTasksMutation } from "../api/apiSlice";
import { useEffect } from "react";
import NProgress from "nprogress";

const TaskForm = () => {
  const [createTask, { isLoading, isError, error, isSuccess }] =
    useCreateTasksMutation();

  useEffect(() => {
    if (isSuccess) {
      // setOpenNoteModal(false);
      // toast.warning("Note deleted successfully");
      NProgress.done();
    }

    if (isError) {
      // setOpenNoteModal(false);
      const err = error;
      const resMessage =
        err.data.message || err.data.detail || err.message || err.toString();
      // toast.error(resMessage, {
      //   position: "top-right",
      // });
      NProgress.done();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);
  /**
   * Description
   * @param {any} e
   * @returns {any}
   *  */
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.elements.name.value.trim();
    const description = e.target.elements.description.value.trim();
    const completed = e.target.elements.completed.checked;

    createTask({
      name,
      description,
      completed,
    });

    console.log(name, description, completed);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name"></input>
      <input type="text" name="description"></input>
      <input type="checkbox" name="completed"></input>
      <button>Add Task</button>
    </form>
  );
};

export default TaskForm;
