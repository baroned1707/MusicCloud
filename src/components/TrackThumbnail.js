import React from "react";

const TrackThumbnail = ({ name, singer, thumbnail, callback }) => {
  return (
    <div className="thumbnail col flex margintopS marginrightM pointer unresize" onClick={callback}>
      <img src={thumbnail} className="thumbnail" />
      <div className="row spacebetween paddingvertical textoverdot">
        <div className="col">
          <div className="h5 textoverdot">{name}</div>
          <div className="h7 placeholder textoverdot">{singer}</div>
        </div>
      </div>
    </div>
  );
};

export default TrackThumbnail;
