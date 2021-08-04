import React, { useEffect, useRef, useState } from "react";
import { Slider } from "antd";
import { endpoint, handleGetTrack } from "../api/get";
import { coverSecToMinute } from "../base/function";
import { useDispatch, useSelector } from "react-redux";
import { SETLOADING } from "../redux/action";
import { host } from "../api/host";

//
import {
  replay,
  prev,
  playwhite,
  pausewhite,
  next,
  playrandom,
  sound,
  likeplace,
  addplaylist,
  download,
  downarrow,
  playlist,
  heartwhite,
  heartactive,
  prewhite,
  pauseblack,
  nextwhite,
  playblack,
} from "../assets/baseicon";

const tempimg =
  "https://i.ytimg.com/vi/sG9JhIRuTkA/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCnJKPjz8ir69uBjnio-QD8j5JnTg";

const PlayAudio = () => {
  const dispatch = useDispatch();

  const refAudio = useRef();
  const playNow = useSelector((state) => state.control.playNow);

  const [process, setProcess] = useState(0);
  const [state, setState] = useState(0);
  const [volume, setVolume] = useState(100);
  const [link, setLink] = useState(null);
  const [downProcess, setDownProcess] = useState(0);
  const [toltalSec, setToltalSec] = useState(0);
  const [time, setTime] = useState(0);
  const [urlDownload, setUrlDownload] = useState("");

  const handleCreateAudio = async () => {
    try {
      if (!playNow.link) return;
      // dispatch({ type: SETLOADING, value: true });
      var url = host + endpoint.getTrack + `?link=${playNow.link}`;
      await setLink(url);

      //event progress
      refAudio.current.addEventListener("progress", handleOnProgress);

      //event canplay audio
      refAudio.current.addEventListener("canplay", handleOnCanPlay);

      //event playing
      refAudio.current.addEventListener("timeupdate", handleOnTimeUpdate);

      //event ended
      refAudio.current.addEventListener("ended", handleOnEnded);
    } catch (e) {
      alert(e.message);
      dispatch({ type: SETLOADING, value: false });
    }
  };

  const handlePlay = () => {
    refAudio.current.play();
  };

  const handlePause = () => {
    refAudio.current.pause();
  };

  const handleOnProgress = () => {
    try {
      var buffered = refAudio.current.buffered;
      var buffered_end = buffered.end(0);
      var progress = (buffered_end / refAudio.current.duration) * 100;
      if (progress >= 100) {
        setDownProcess(0);
      } else {
        setDownProcess(progress);
      }
    } catch {
      console.log("Fail");
    }
  };

  const handleOnCanPlay = () => {
    // refAudio.current.play();
    // setState(1);
    setToltalSec(refAudio.current.duration);
    handleDownload();
    dispatch({ type: SETLOADING, value: false });
  };

  const handleOnTimeUpdate = () => {
    var time = parseInt(refAudio.current.currentTime);
    var duration = refAudio.current.duration;
    var tempProcess = (time / duration) * 100;
    setTime(time);
    setProcess(tempProcess);
  };

  const handleOnEnded = () => {
    setState(0);
    setProcess(0);
  };

  const handleChangeVolume = (e) => {
    setVolume(e);
    refAudio.current.volume = e / 100;
  };

  const handleChangeState = () => {
    if (!state) {
      handlePlay();
    } else {
      handlePause();
    }
    setState(!state);
  };

  const handleDownload = () => {
    if (!playNow.link) {
      setUrlDownload("");
      return;
    }
    var url = host + endpoint.downloadTrack + `?link=${playNow.link}&name=${playNow.description}`;
    setUrlDownload(url);
  };

  useEffect(() => {
    handleCreateAudio();
  }, [playNow]);

  return (
    <div className="container mx-auto min-h-screen flex flex-col bg-black justify-between">
      <div className="flex flex-col">
        <div className="decor absolute z-1 inset-0 rounded-br-3xl"></div>
        <div className="flex my-8 z-10">
          <img src={downarrow} className="icon mx-8" />
          <div className="flex-1 font-sans subpixel-antialiased font-medium text-lg text-center">{"PLAYING NOW"}</div>
          <img src={playlist} className="icon mx-8" />
        </div>
        <img src={tempimg} className="thumbnail self-center rounded-3xl shadow-2xl z-10" />
        <div className="flex justify-between items-center px-10">
          <div className="flex flex-col my-8">
            <div className="text-3xl font-sans font-medium text-white">Last Dance</div>
            <div className="text-xl font-sans font-medium text-gray-400">Rhye</div>
          </div>
          <img src={heartactive} className="icon" />
        </div>
      </div>
      <div className="flex flex-col my-16">
        <audio src={link} ref={refAudio}></audio>
        <div className="flex px-10 flex-col justify-between items-center">
          <Slider className="container" max={toltalSec} min={0} step={1} value={time} />
          <div className="container flex justify-between items-center">
            <div className="text-x font-sans font-medium text-gray-400">{coverSecToMinute(time)}</div>
            <div className="text-x font-sans font-medium text-gray-400">{coverSecToMinute(toltalSec)}</div>
          </div>
        </div>
        <div className="container flex justify-between items-center px-10">
          <img src={playrandom} className="controlicon" />
          <img src={prewhite} className="controlicon" />
          <div className="control flex justify-center items-center" onClick={handleChangeState}>
            <img src={state == 1 ? pauseblack : playblack} className="icon" />
          </div>
          <img src={nextwhite} className="controlicon" />
          <img src={replay} className="controlicon" />
        </div>
      </div>
    </div>
  );
};

export default PlayAudio;
