import React from "react";
import TrackThumbnail from "./TrackThumbnail";

const data = [
  {
    name: "Tháng năm",
    singer: "Sobin Hoàng Sơn",
    thumbnail:
      "https://i9.ytimg.com/s_p/RDCLAK5uy_nfs_t4FUu00E5ED6lveEBBX1VMYe1mFjk/mqdefault.jpg?sqp=CNy5j4gGir7X7AMGCPni-YEG&rs=AOn4CLD4XYjemZYnCy-fvs8MxXwM7aC-gg&v=1614705017",
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
