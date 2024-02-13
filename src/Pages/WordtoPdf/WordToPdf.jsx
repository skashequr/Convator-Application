import axios from "axios";
import { useState } from "react";

const WordToPdf = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleConvert = async () => {
    const formData = new FormData();
    formData.append("docxFile", file);

    try {
      const response = await axios.post(
        "http://localhost:500/convert",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          responseType: "blob",
        }
      );

      // Create a blob object from the PDF data received
      const pdfBlob = new Blob([response.data], { type: "application/pdf" });
      const pdfUrl = window.URL.createObjectURL(pdfBlob);

      // Create a link element to trigger the download
      const downloadLink = document.createElement("a");
      downloadLink.href = pdfUrl;
      downloadLink.setAttribute("download", "converted.pdf");
      document.body.appendChild(downloadLink);

      // Trigger the download
      downloadLink.click();

      // Clean up
      window.URL.revokeObjectURL(pdfUrl);
      document.body.removeChild(downloadLink);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="pt-28">
      <div>
        <input type="file" accept=".docx" onChange={handleFileChange} />
        <button onClick={handleConvert}>Convert to PDF</button>
      </div>
    </div>
  );
};

export default WordToPdf;
