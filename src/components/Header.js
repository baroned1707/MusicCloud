import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { handleGetSearch } from "../api/get.js";

//
import { logo, search } from "../assets/baseicon.js";
import { SETLOADING, SETRESULTSEARCH } from "../redux/action.js";

const Header = () => {
  const dispatch = useDispatch();

  const [keywork, setKeywork] = useState("");

  const handleSearch = (e) => {
    setKeywork(e.target.value);
  };

  const handleGetResult = async () => {
    if (keywork != "") {
      dispatch({ type: SETLOADING, value: true });
      var data = await handleGetSearch(keywork);
      if (data.status == true) {
        console.log(data.data);
        dispatch({ type: SETRESULTSEARCH, value: data.data });
      } else {
        alert("Có lỗi sảy ra vui lòng thử lại !");
      }
      dispatch({ type: SETLOADING, value: false });
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      console.log(keywork);
      handleGetResult();
      // Send Axios request here
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [keywork]);

  return (
    <div className="row paddingvertical">
      <div className="logocontainer row itemscenter width20">
        <img src={logo} className="logo paddinghorizalS" />
        <div className="tittleLogo h2 paddinghorizalS">MusCloud</div>
      </div>
      <div className="search row paddinghorizal paddingvertical itemscenter flex">
        <img src={search} className="icon" />
        <input
          className="input h2 placeholder paddinghorizalS flex"
          placeholder="Search for songs, album, etc ..."
          onChange={handleSearch}
        />
      </div>
    </div>
  );
};

export default Header;
