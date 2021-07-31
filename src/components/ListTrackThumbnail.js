import React from "react";
import TrackThumbnail from "./TrackThumbnail";

const data = [
  {
    name: "Tháng năm",
    singer: "Sobin Hoàng Sơn",
    thumbnail:
      "https://i.ytimg.com/vi/YEbz2Qt3vec/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLD0Le23f7uPo0xFWcoXeZpnCkU6SQ",
  },
];

const ListTrackThumbnail = () => {
  const handleRenderTrack = () => {
    var temprender = [];
    data.map((cur, i) => {
      temprender.push(<TrackThumbnail name={cur.name} singer={cur.singer} thumbnail={cur.thumbnail} key={i} />);
    });
    return temprender;
  };

  return <div className="container row scrollx">{handleRenderTrack()}</div>;
};

export default ListTrackThumbnail;
