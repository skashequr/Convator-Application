import { useState } from "react";
import axios from "axios";

const VideoToMp3Converter = () => {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [conversionMessage, setConversionMessage] = useState("");

  const handleConvert = async () => {
    try {
      const response = await axios.post("http://localhost:5000/convert", {
        youtube_url: youtubeUrl,
      });
      setConversionMessage(response.data.message);
    } catch (error) {
      console.error("Error:", error);
      setConversionMessage("Failed to convert audio.");
    }
  };
  const handleDownload = async () => {
    try {
      const response = await axios.get("http://localhost:5000/download", {
        responseType: "blob", // Ensure response is treated as a binary object
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "output_audio.mp3");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error:", error);
      setConversionMessage("Failed to download audio.");
    }
  };
  return (
    <div className="pt-28 text-TextColor bg-gradient-to-r from-cardBgHexaPrimary to-cardBgHexaSecondary">
      <input
        type="text"
        value={youtubeUrl}
        onChange={(e) => setYoutubeUrl(e.target.value)}
        placeholder="Enter YouTube URL"
      />
      <button onClick={handleConvert}>Convert to Audio</button>
      <button onClick={handleDownload}>Download Audio</button>
      {conversionMessage && <p>{conversionMessage}</p>}
    </div>
  );
};

export default VideoToMp3Converter;
