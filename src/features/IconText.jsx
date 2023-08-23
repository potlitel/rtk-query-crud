/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Space } from "antd";

const IconText = ({ icon, text }) => {
  return (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );
};

export default IconText;
