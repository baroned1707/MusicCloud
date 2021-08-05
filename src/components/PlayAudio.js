import React, { useEffect, useRef, useState } from "react";
import { Slider } from "antd";
import { endpoint } from "../api/get";
import { coverSecToMinute } from "../base/function";
import { useDispatch, useSelector } from "react-redux";
import { SETLOADING, SETNEXT, SETPREV } from "../redux/action";
import { host } from "../api/host";

//
import {
  replay,
  playwhite,
  pausewhite,
  playrandom,
  downarrow,
  playlist,
  prewhite,
  pauseblack,
  nextwhite,
  playblack,
} from "../assets/baseicon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const tempimg =
  "https://i.ytimg.com/vi/sG9JhIRuTkA/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCnJKPjz8ir69uBjnio-QD8j5JnTg";

const PlayAudio = () => {
  const dispatch = useDispatch();

  const refAudio = useRef();
  const refControl = useRef();
  const refMiniControl = useRef();

  const playList = useSelector((state) => state.control.playList);
  const indexPlay = useSelector((state) => state.control.indexPlay);

  const [playNow, setPlayNow] = useState(indexPlay != null ? playList[indexPlay] : null);
  const [active, setActive] = useState(0);
  const [process, setProcess] = useState(0);
  const [state, setState] = useState(0);
  const [volume, setVolume] = useState(100);
  const [link, setLink] = useState(null);
  const [downProcess, setDownProcess] = useState(0);
  const [toltalSec, setToltalSec] = useState(0);
  const [time, setTime] = useState(0);
  const [urlDownload, setUrlDownload] = useState("");

  const handleActive = () => {
    refControl.current.style.animationName = "showcontrol";
    refControl.current.style.animationDuration = "0.5s";
    refAudio.current.style.animationPlayState = "running";
    setActive(1);
  };

  const handleUnActive = () => {
    refControl.current.style.animationName = "hiddencontrol";
    refControl.current.style.animationDuration = "0.5s";
    refAudio.current.style.animationPlayState = "running";
    setTimeout(() => {
      setActive(0);
    }, 200);
  };

  const handleCreateAudio = async () => {
    try {
      if (!playNow) return;
      // dispatch({ type: SETLOADING, value: true });
      setProcess(0);
      setDownProcess(0);
      setState(0);
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
    if (!playNow) {
      setUrlDownload("");
      return;
    }
    var url = host + endpoint.downloadTrack + `?link=${playNow.link}&name=${playNow.description}`;
    setUrlDownload(url);
  };

  const handleNext = () => {
    dispatch({ type: SETNEXT });
  };

  const handlePrev = () => {
    dispatch({ type: SETPREV });
  };

  const handleChangePlayNow = () => {
    if (indexPlay == null) return;
    setPlayNow(playList[indexPlay]);
  };

  useEffect(() => {
    handleCreateAudio();
  }, [playNow]);

  useEffect(() => {
    handleChangePlayNow();
  }, [indexPlay, playList]);

  return (
    <>
      <div
        className="container mx-auto min-h-screen flex flex-col bg-black justify-between absolute inset-0"
        hidden={active == 0 ? true : false}
        ref={refControl}
      >
        <div className="flex flex-col">
          <div className="decor absolute z-1 inset-0 rounded-br-3xl"></div>
          <div className="flex my-8 z-10">
            <img src={downarrow} className="icon mx-8" onClick={handleUnActive} />
            <div className="flex-1 font-sans subpixel-antialiased font-medium text-lg text-center">{"PLAYING NOW"}</div>
            <img src={playlist} className="icon mx-8" />
          </div>
          <img src={playNow.thumbnail} className="thumbnail self-center rounded-3xl shadow-2xl z-10" />
          <div className="flex justify-between items-center px-10">
            <div className="flex flex-col my-8 mr-6 flex-auto w-0 ">
              <div className="text-xl font-sans font-medium text-white truncate">{playNow.description}</div>
              <div className="text-lg font-sans font-medium text-gray-400 truncate">{playNow.title}</div>
            </div>
            <FontAwesomeIcon icon={faHeart} className="text-3xl text-white" />
          </div>
        </div>
        <div className="flex flex-col my-16">
          <div className="flex px-10 flex-col justify-between items-center">
            <Slider className="container" max={toltalSec} min={0} step={1} value={time} />
            <div className="container flex justify-between items-center">
              <div className="text-x font-sans font-medium text-gray-400">{coverSecToMinute(time)}</div>
              <div className="text-x font-sans font-medium text-gray-400">{coverSecToMinute(toltalSec)}</div>
            </div>
          </div>
          <div className="container flex justify-between items-center px-10">
            <img src={playrandom} className="controlicon" />
            <img src={prewhite} className="controlicon" onClick={handlePrev} />
            <div className="control flex justify-center items-center" onClick={handleChangeState}>
              <img src={state == 1 ? pauseblack : playblack} className="icon" />
            </div>
            <img src={nextwhite} className="controlicon" onClick={handleNext} />
            <img src={replay} className="controlicon" />
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col justify-between  bg-black" hidden={active == 0 ? false : true} ref={refMiniControl}>
        <div className="w-full flex h-16 justify-between bg-black">
          <div className="flex" onClick={handleActive}>
            <img src={playNow.thumbnail} />
            <div className="flex flex-col flex-auto w-0 justify-center pl-2 overflow-hidden">
              <div className="text-xl font-sans text-white truncate">{playNow.description}</div>
              <div className="text-lg font-sans text-gray-400 truncate">{playNow.title}</div>
            </div>
          </div>
          <img src={state == 1 ? pausewhite : playwhite} className="h-2/5 mx-6 self-center" onClick={handleChangeState} />
        </div>
        <div
          className="bg-white h-1 my-1 rounded"
          style={{
            width: `${downProcess}%`,
          }}
        ></div>
        <div
          className="bg-white h-1 my-1 rounded"
          style={{
            width: `${process}%`,
          }}
        ></div>
      </div>
      <audio src={link} ref={refAudio}></audio>
    </>
  );
};

export default PlayAudio;
