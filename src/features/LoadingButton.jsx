/* eslint-disable react/prop-types */
import { twMerge } from "tailwind-merge";
import Spinner from "./Spinner";

// type LoadingButtonProps = {
//   loading: boolean,
//   btnColor?: string,
//   textColor?: string,
//   children: React.ReactNode,
// };

export const LoadingButton = ({
  textColor = "text-black",
  btnColor = "bg-indigo-500",
  children,
  loading = false,
  text = "",
}) => {
  return (
    <button
      type="submit"
      className={twMerge(
        `w-full py-3 font-semibold ${btnColor} rounded-lg outline-none border-none flex justify-center`,
        `${loading && "bg-[#ccc]"}`
      )}
    >
      {loading ? (
        <div className="flex items-center gap-3">
          <Spinner />
          <span className="text-white inline-block">{text}</span>
        </div>
      ) : (
        <span className={`text-lg font-normal ${textColor}`}>{children}</span>
      )}
    </button>
  );
};
