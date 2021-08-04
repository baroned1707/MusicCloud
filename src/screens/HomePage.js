import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

//
import PlayAudio from "../components/PlayAudio";

const HomePage = () => {
  const resultSearch = useSelector((state) => state.data.resultSearch);

  useEffect(() => {}, [resultSearch]);

  return <PlayAudio />;
};

export default HomePage;
