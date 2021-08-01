import { host } from "./host";
import axios from "axios";

export const endpoint = {
  getTrack: "/api/track/gettrack",
  getSearch: "/api/track/search",
  downloadTrack: "/api/track/download",
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

export const handleGetSearch = async (keywork) => {
  var url = host + endpoint.getSearch + `?keywork=${keywork}`;
  var result = {};
  await axios
    .get(url)
    .then((res) => {
      result = res;
    })
    .catch((e) => {
      result = {
        status: false,
        data: [],
      };
    });
  return result.data;
};
