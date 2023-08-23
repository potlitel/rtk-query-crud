/* eslint-disable react/prop-types */
import ReactLoading from "react-loading";

const Loading = ({ type, color }) => {
  return (
    <ReactLoading type={type} color={color} height={"20%"} width={"20%"} />
  );
};

export default Loading;
