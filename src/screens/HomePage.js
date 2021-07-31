import React from "react";
import ListTrack from "../components/ListTrack";
import ListTrackThumbnail from "../components/ListTrackThumbnail";
import Menu from "../components/Menu";
import Slider from "../components/Slider";

//
import PlayAudio from "../components/PlayAudio";
import Header from "../components/Header";

const HomePage = () => {
  return (
    <div className="container col">
      <div className="mainview col paddinghorizal scrolly">
        <Header />
        <div className="row paddingvertical margintopS flex">
          <Menu />
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
        </div>
      </div>
      <PlayAudio />
    </div>
  );
};

export default HomePage;
