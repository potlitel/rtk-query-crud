/* eslint-disable react/prop-types */
import { Skeleton } from "antd";
const SkeletonParagraph = ({ loading }) => {
  return (
    <>
      <br />
      <br />
      <Skeleton
        title={false}
        loading={loading}
        active
        paragraph={{
          rows: 10,
        }}
      ></Skeleton>
    </>
  );
};

export default SkeletonParagraph;
