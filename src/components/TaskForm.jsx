/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useCreateTasksMutation } from "../api/apiSlice";
import { useEffect } from "react";
import NProgress from "nprogress";
import { notification } from "antd";
import { object, string } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoadingButton } from "../features/LoadingButton";
import { twMerge } from "tailwind-merge";

const TaskForm = ({ setOpenNoteModal }) => {
  const [createTask, { isLoading, isError, error, isSuccess }] =
    useCreateTasksMutation();

  const createNoteSchema = object({
    name: string().min(1, "Task name is required"),
    description: string().min(1, "Task description is required"),
  });

  // export type CreateNoteInput = TypeOf<typeof createNoteSchema>;

  const methods = useForm({
    resolver: zodResolver(createNoteSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = methods;

  useEffect(() => {
    if (isSuccess) {
      // setOpenNoteModal(false);
      // toast.warning("Note deleted successfully");
      notification.success({
        message: "Action completed",
        placement: "bottomRight",
        description: "Task added successfully.",
      });
      NProgress.done();
    }

    if (isError) {
      // setOpenNoteModal(false);
      const err = error;
      const resMessage =
        err.data.message || err.data.detail || err.message || err.toString();
      notification.error({
        message: "An error has ocurred",
        placement: "bottomRight",
        description: resMessage,
      });
      NProgress.done();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);
  /**
   * Description
   * @param {any} e
   * @returns {any}
   *  */
  const handleSubmitt = (e) => {
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

  const onSubmitHandler = async (data) => {
    createTask(data);
    reset(); // reset form with user data
  };

  return (
    // <form onSubmit={handleSubmit}>
    //   <input type="text" name="name"></input>
    //   <input type="text" name="description"></input>
    //   <input type="checkbox" name="completed"></input>
    //   <button>Add Task</button>
    // </form>
    <section>
      <div className="flex justify-between items-center mb-3 pb-3 border-b border-gray-200">
        <h2 className="text-2xl text-ct-dark-600 font-semibold">Create Note</h2>
        <div
          onClick={() => setOpenNoteModal(false)}
          className="text-2xl text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg p-1.5 ml-auto inline-flex items-center cursor-pointer"
        >
          <i className="bx bx-x"></i>
        </div>
      </div>
      <form className="w-full" onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="mb-2">
          <label className="block text-gray-700 text-lg mb-2" htmlFor="name">
            Name
          </label>
          <input
            className={twMerge(
              `appearance-none border border-gray-400 rounded w-full py-3 px-3 text-gray-700 mb-2  leading-tight focus:outline-none`,
              `${errors["name"] && "border-red-500"}`
            )}
            {...methods.register("name")}
          />
          <p
            className={twMerge(
              `text-red-500 text-xs italic mb-2 invisible`,
              `${errors["name"] && "visible"}`
            )}
          >
            {errors["name"]?.message}
          </p>
        </div>
        <div className="mb-2">
          <label className="block text-gray-700 text-lg mb-2" htmlFor="name">
            Description
          </label>
          <textarea
            className={twMerge(
              `appearance-none border border-gray-400 rounded w-full py-3 px-3 text-gray-700 mb-2 leading-tight focus:outline-none`,
              `${errors.description && "border-red-500"}`
            )}
            rows={6}
            {...register("description")}
          />
          <p
            className={twMerge(
              `text-red-500 text-xs italic mb-2`,
              `${errors.description ? "visible" : "invisible"}`
            )}
          >
            {errors.description && errors.description.message}
          </p>
        </div>
        <div className="mb-2">
          <input
            type="checkbox"
            id="completed"
            {...register("completed").checked}
          />
          <label htmlFor="completed">Completed task?</label>
          <svg
            className="
      absolute 
      w-4 h-4 mt-1
      hidden peer-checked:block"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <LoadingButton loading={isLoading}>Create Task</LoadingButton>
      </form>
    </section>
  );
};

export default TaskForm;
