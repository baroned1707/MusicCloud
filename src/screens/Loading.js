import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

const antIcon = <LoadingOutlined style={{ fontSize: 100, color: "#ffe145" }} spin />;

const Loading = () => {
  const show = useSelector((state) => state.data.loading);

  return (
    <div className="containerpositon col center backgroundpositon" hidden={!show}>
      <Spin indicator={antIcon} />
    </div>
  );
};

export default Loading;
