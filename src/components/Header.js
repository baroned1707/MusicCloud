import React from "react";

//
import { logo, search } from "../assets/baseicon.js";

const Header = () => {
  return (
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
  );
};

export default Header;
