import { host } from "./host";
import axios from "axios";

const endpoint = {
  getTrack: "/api/track/gettrack",
};

export const handleGetTrack = async (link, setDownProcess) => {
  var url = host + endpoint.getTrack + `?link=${link}`;
  var result = await axios.get(url, {
    responseType: "arraybuffer",
    onDownloadProgress: (e) => {
      setDownProcess(Math.round((e.loaded * 100) / e.total));
    },
  });
  return result.data ? result.data : null;
};
