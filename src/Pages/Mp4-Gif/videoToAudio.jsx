import { useState } from "react";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

const VideoToGifEditor = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [gifFile, setGifFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const convertToGif = async () => {
    setIsLoading(true);
    const ffmpegInstance = createFFmpeg({ log: true });
    await ffmpegInstance.load();
    ffmpegInstance.FS("writeFile", "input.mp4", await fetchFile(videoFile));
    await ffmpegInstance.run("-i", "input.mp4", "output.gif");
    const data = ffmpegInstance.FS("readFile", "output.gif");
    const url = URL.createObjectURL(
      new Blob([data.buffer], { type: "image/gif" })
    );
    setGifFile(url);
    setIsLoading(false);
  };

  const downloadGif = () => {
    const a = document.createElement("a");
    a.href = gifFile;
    a.download = "converted.gif";
    a.click();
  };

  return (
    <div className="container mx-auto p-4">
      <input
        type="file"
        onChange={(e) => setVideoFile(e.target.files?.item(0))}
        accept="video/*"
      />
      <button onClick={convertToGif} disabled={!videoFile || isLoading}>
        {isLoading ? "Converting..." : "Convert to GIF"}
      </button>
      {gifFile && (
        <div>
          <img src={gifFile} alt="Converted GIF" />
          <button onClick={downloadGif}>Download GIF</button>
        </div>
      )}
    </div>
  );
};

export default VideoToGifEditor;
