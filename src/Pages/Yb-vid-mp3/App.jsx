import axios from "axios";
import openSocket from "socket.io-client";
import { useState, useEffect } from "react";
import { Progress } from "keep-react";

const URL = "http://localhost:5000/";
const socket = openSocket(URL);

const App = () => {
  const [urlText, setUrlText] = useState("");
  const [respData, setRespData] = useState("");
  const [percentage, setPercentage] = useState("");
  const [dataToBeDownloaded, setDataToBeDownloaded] = useState(0);
  const [dataDownloaded, setDataDownloaded] = useState(0);
  const [blobData, setBlobData] = useState(null);
  const [videoName, setVideoName] = useState("");
  const [videoUploader, setVideoUploader] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        URL,
        { url: urlText },
        {
          responseType: "blob",
          onDownloadProgress: (progressEvent) => {
            setDataDownloaded(progressEvent.loaded);
          },
        }
      )
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        setBlobData(url);
      });
  };

  const handleTextChange = (e) => {
    setUrlText(e.target.value);
  };

  useEffect(() => {
    socket.on("progressEventSocket", (data) => {
      setPercentage(data[0]);
    });

    socket.on("downloadCompletedServer", (data) => {
      setDataToBeDownloaded(data[0]);
    });

    socket.on("videoDetails", (data) => {
      setVideoName(data[0]);
      setVideoUploader(data[1]);
    });

    return () => {
      // Cleanup code for socket subscriptions
      socket.off("progressEventSocket");
      socket.off("downloadCompletedServer");
      socket.off("videoDetails");
    };
  }, []);

  return (
    <div className=" pt-44 mx-auto">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="mb-4">
          <input
            required
            type="text"
            placeholder="URL"
            value={urlText}
            onChange={(e) => handleTextChange(e)}
            className="px-4 py-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div className="text-center mt-4">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Start Process
          </button>
        </div>
      </form>

      {videoName !== "" && (
        <div className="mt-4">
          <h1 className="text-2xl font-bold">Title: {videoName}</h1>
          <p>Uploaded By: {videoUploader}</p>
        </div>
      )}

      <div className="mt-4">
        <Progress
          animated={percentage === 100 ? false : true}
          value={percentage}
        >
          Warming up the router
        </Progress>
      </div>

      <div className="mt-4">
        <Progress
          animated={
            (dataDownloaded * 100) / dataToBeDownloaded === 100 ? false : true
          }
          color="success"
          value={
            dataToBeDownloaded > 0
              ? (dataDownloaded * 100) / dataToBeDownloaded
              : 0
          }
        >
          Youre Hacking Now. Be Patient :)
        </Progress>
      </div>

      {blobData !== null && (
        <div className="mt-4">
          <p>Congratulations! Youve hacked into the Pentagon</p>
          <a href={blobData} download={videoName + ".mp3"}>
            <button className="px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-600">
              Download
            </button>
          </a>
        </div>
      )}
    </div>
  );
};

export default App;
