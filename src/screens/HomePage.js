import React from "react";
import ListTrack from "../components/ListTrack";
import ListTrackThumbnail from "../components/ListTrackThumbnail";
import Menu from "../components/Menu";
import Slider from "../components/Slider";

//
import { logo, search } from "../assets/import.js";

const Home = () => {
  return (
    <div className="container col">
      <div className="col paddinghorizal">
        <div className="row paddingvertical">
          <div className="logocontainer row itemscenter width20">
            <img src={logo} className="logo paddinghorizalS" />
            <div className="tittleLogo h2 paddinghorizalS">MusCloud</div>
          </div>
          <div className="search row paddinghorizal paddingvertical itemscenter flex">
            <img src={search} className="icon" />
            <input className="input h2 placeholder paddinghorizalS flex" placeholder="Search for songs, album, etc ..." />
          </div>
        </div>
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
      <div className="container col"></div>
    </div>
  );
};

export default Home;
