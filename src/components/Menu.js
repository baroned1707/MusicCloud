import React, { useState } from "react";

//
import { home, headphones, album, musicartists, like } from "../assets/import";

const menu = [
  {
    tittle: "Music",
    icon: home,
  },
  {
    tittle: "Songs",
    icon: headphones,
  },
  {
    tittle: "Albums",
    icon: album,
  },
  {
    tittle: "Artists",
    icon: musicartists,
  },
  {
    tittle: "Liked",
    icon: like,
  },
];

const Menu = () => {
  const [active, setActive] = useState(0);

  const handleActive = (index) => {
    setActive(index);
  };

  const handleRenderMenu = () => {
    var temprender = [];
    menu.map((cur, i) => {
      temprender.push(
        <div
          className={`nav row itemscenter borderradiusS paddinghorizal paddingvertical flex pointer unresize ${
            active == i ? "active" : ""
          }`}
          onClick={() => {
            handleActive(i);
          }}
          key={i}
        >
          <img src={cur.icon} className="icon" />
          <div className="tittleLogo h3 paddinghorizal">{cur.tittle}</div>
        </div>
      );
    });
    return temprender;
  };

  return (
    <div className="col width20">
      <div className="tittleLogo h2 paddinghorizal placeholder">Music</div>
      {handleRenderMenu()}
    </div>
  );
};

export default Menu;
