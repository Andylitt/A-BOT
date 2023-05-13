import axios from "axios"
import proxyAgent from "https-proxy-agent"
const proxies = undefined // new proxyAgent("http://sgp1:clph123@165.22.254.144:3128");

async function convert(vid, key) {
   console.log(`Convert ${vid} with key ${key}`);
  return axios
    .post(
      "https://yt1s.com/api/ajaxConvert/convert",
      new URLSearchParams({ vid, k: key }),
      {
        headers: {
          Host: "yt1s.com",
          "User-agent":
            "Mozilla/5.0 (Linux; Android 11; RMX3235) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Mobile Safari/537.36",
          Origin: "https://yt1s.com",
          Referer: "https://yt1s.com/en431",
        },
        httpsAgent: proxies,
      }
    )
    .then((a) => {
        console.log(`Success convert ${vid} with key ${key}`);
        console.log(a.data);
        return a.data;
        }).catch((e) => {	
        console.log(`Failed convert ${vid} with key ${key}`);
        console.log(e);
        throw e;
    });
}

async function download(uri) {
  return axios({
    responseType: "arraybuffer",
    method: "GET",
    url: uri,
    headers: {
      "User-agent":
        "Mozilla/5.0 (Linux; Android 11; RMX3235) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Mobile Safari/537.36",
      Origin: "https://yt1s.com",
      Referer: "https://yt1s.com/en431",
    },
    httpsAgent: proxies,
  }).then((a) => a.data);
}

async function downloadMP3(url) {
    try {
  euy = {};
  let { data } = await axios.post(
    "https://yt1s.com/api/ajaxSearch/index",
    new URLSearchParams({ q: url, vt: "home" }),
    {
      headers: {
        Host: "yt1s.com",
        "User-agent":
          "Mozilla/5.0 (Linux; Android 11; RMX3235) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Mobile Safari/537.36",
        Origin: "https://yt1s.com",
        Referer: "https://yt1s.com/en431",
      },
      httpsAgent: proxies,
    }
  );
  if (!data.links) throw data.mess;
  euy.details = await convert(data.vid, data.links.mp3.mp3128.k);
  euy.download = function () {
    return download(euy.details.dlink);
  };
  return euy;
    } catch (e) {
        console.log(e);
        throw e;
    }
}

async function downloadMP4HD(url) {
    try {
  euy = {};
  let { data } = await axios.post(
    "https://yt1s.com/api/ajaxSearch/index",
    new URLSearchParams({ q: url, vt: "home" }),
    {
      headers: {
        Host: "yt1s.com",
        "User-agent":
          "Mozilla/5.0 (Linux; Android 11; RMX3235) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Mobile Safari/537.36",
        Origin: "https://yt1s.com",
        Referer: "https://yt1s.com/en431",
      },
      httpsAgent: new (require("https-proxy-agent"))(
        "http://sgp1:clph123@165.22.254.144:3128"
      ),
    }
  );
  if (!data.links) throw data.mess;
  let array = Object.entries(data.links.mp4).map((a) => a[1]);
  high = array.reduce((highest, current) => {
    if (current.q === "1080p") {
      return current;
    } else {
      return highest;
    }
  }, array[0]);

  let gg = await convert(data.vid, high.k);
  euy.details = gg;
  euy.download = function () {
    return download(euy.details.dlink);
  };
  return euy;
    } catch (e) {
      console.log(e)
      throw e; 
    }  
}


export {
  mp3: downloadMP3, 
  mp4: downloadMP4HD
}