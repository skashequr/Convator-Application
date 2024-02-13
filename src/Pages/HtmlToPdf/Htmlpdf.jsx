import { useState } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const HtmlToPdf = () => {
  const [file, setFile] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setPdfUrl(null);
  };

  const convertToPdf = async () => {
    if (!file) {
      alert("Please upload an HTML file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      const htmlString = reader.result;
      const pdf = new jsPDF();
      const tempDiv = document.createElement("div"); // Create a new div
      tempDiv.innerHTML = htmlString; // Set inner HTML to the HTML string
      document.body.appendChild(tempDiv); // Append the div to the document body

      try {
        const canvas = await html2canvas(tempDiv); // Capture the div content as canvas
        const imgData = canvas.toDataURL("image/png");
        const imgWidth = 210; // A4 width in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width; // Calculate height according to aspect ratio
        pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);
        const pdfBlob = pdf.output("blob"); // Generate PDF blob
        const pdfUrl = URL.createObjectURL(pdfBlob); // Create URL for the blob
        setPdfUrl(pdfUrl); // Set PDF URL to state
      } catch (error) {
        console.error("Error capturing canvas:", error);
      } finally {
        document.body.removeChild(tempDiv); // Remove the temporary div
      }
    };
    reader.readAsText(file);
  };

  const downloadPdf = () => {
    if (!pdfUrl) {
      alert("PDF is not generated yet.");
      return;
    }

    const a = document.createElement("a");
    a.href = pdfUrl;
    a.download = `${file.name}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="pt-28">
      <input type="file" accept=".html" onChange={handleFileChange} />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={convertToPdf}
      >
        Convert to PDF
      </button>
      <button
        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => downloadPdf("rootElementId")}
      >
        Download PDF Document
      </button>
      <pre></pre>
    </div>
  );
};

export default HtmlToPdf;
