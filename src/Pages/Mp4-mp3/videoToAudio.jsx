import axios from "axios";
import { useState } from "react";

const Mp4ToMp3Converter = () => {
  // ------------
  const convertMp4ToMp3 = async (file) => {
    const formData = new FormData();
    formData.append("mp4File", file);

    try {
      // You can handle the response here, for example, show a download link to the user.
    } catch (error) {
      console.error("Error converting MP4 to MP3:", error);
    }
  };

  // --------
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call a function to handle the conversion
    convertMp4ToMp3(file);
  };

  return (
    <div className="pt-24">
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".mp4" onChange={handleFileChange} />
        <button type="submit">Convert to MP3</button>
      </form>
    </div>
  );
};

export default Mp4ToMp3Converter;
