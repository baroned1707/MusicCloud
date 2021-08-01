import React from "react";
import ListTrack from "./ListTrack";
import ListTrackThumbnail from "./ListTrackThumbnail";
import Slider from "./Slider";

const Content = () => {
  return (
    <>
      <div className="col width50 unresize">
        <div className="col flex unresize">
          <div className="h1">Albums</div>
          <Slider />
        </div>
        <div className="col flex margintopS unresize">
          <div className="h1">Recently Added</div>
          <ListTrackThumbnail />
        </div>
      </div>
      <div className="col width30 paddinghorizalS unresize">
        <div className="h1 paddinghorizal">Top Trending</div>
        <ListTrack />
      </div>
    </>
  );
};

export default Content;
