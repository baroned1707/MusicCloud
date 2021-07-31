import React from "react";

const TrackThumbnail = ({ name, singer, thumbnail }) => {
  return (
    <div className="thumbnail col flex margintopS unresize marginrightM">
      <img src={thumbnail} className="thumbnail" />
      <div className="row spacebetween paddingvertical">
        <div className="col">
          <div className="h5">{name}</div>
          <div className="h7 placeholder">{singer}</div>
        </div>
      </div>
    </div>
  );
};

export default TrackThumbnail;
