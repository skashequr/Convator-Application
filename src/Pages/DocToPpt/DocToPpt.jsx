// App.js

import { useState } from "react";
import axios from "axios";

function DocToPpt() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("docFile", file);

    try {
      const response = await axios.post(
        "https://file-convator-backend.vercel.app/convert/docToPpt",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "converted.pptx");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="p-36">
      <h1>Convert .doc to PowerPoint</h1>
      <input type="file" accept=".doc" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!file}>
        Convert
      </button>
    </div>
  );
}

export default DocToPpt;
