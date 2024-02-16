import { useState } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { Button, Card, FileInput, Label } from "flowbite-react";

const HtmlToPdf = () => {
  const [file, setFile] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [fileName, setFileName] = useState("");
  // --------------upload file-------------
  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
    setFileName(uploadedFile.name);

    setPdfUrl(null);
  };
  // ------------------- convert file------------------
  const convertToPdf = async () => {
    if (!file) {
      alert("Please upload an HTML file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      const htmlString = reader.result;
      const pdf = new jsPDF();
      // Create a new div
      const tempDiv = document.createElement("div");
      // Set inner HTML to the HTML string
      tempDiv.innerHTML = htmlString;

      // Add a container div and apply CSS to center text
      const containerDiv = document.createElement("div");
      // Center align text
      containerDiv.style.textAlign = "center";
      // Center horizontally
      containerDiv.style.margin = "0 auto";
      // Append the original content
      containerDiv.appendChild(tempDiv);
      // Append the container div to the document body
      document.body.appendChild(containerDiv);

      try {
        // Capture the div content as canvas
        const canvas = await html2canvas(containerDiv);
        const imgData = canvas.toDataURL("image/png");
        // A4 width in mm
        const imgWidth = 210;
        // Calculate height according to aspect ratio
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);
        // Generate PDF blob
        const pdfBlob = pdf.output("blob");
        // Create URL for the blob
        const pdfUrl = URL.createObjectURL(pdfBlob);
        // Set PDF URL to state
        setPdfUrl(pdfUrl);
      } catch (error) {
        console.error("Error capturing canvas:", error);
      } finally {
        // Remove the temporary div
        document.body.removeChild(containerDiv);
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
  // ----------drag and drop-------
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const uploadedFile = e.dataTransfer.files[0];
    setFile(uploadedFile);
    setFileName(uploadedFile.name);
  };
  return (
    <div className="pt-28">
      <Card href="#" className="w-full">
        <div className="flex w-full items-center justify-center">
          <Label
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            htmlFor="dropzone-file"
            className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pb-6 pt-5">
              <svg
                className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Only Html file upload
              </p>
              <FileInput
                type="file"
                accept=".html"
                onChange={handleFileChange}
                id="dropzone-file"
                className="hidden"
              />
              <div className="text-center mt-4">
                {fileName && (
                  <div className="text-center mt-4">
                    <p className="text-red-400 ">Uploaded File: {fileName}</p>
                  </div>
                )}
              </div>
            </div>
          </Label>
        </div>
      </Card>

      <div className="justify-between mt-4 inline-flex  gap-4">
        <Button onClick={convertToPdf}>convert Pdf</Button>
        <Button onClick={() => downloadPdf("rootElementId")}>
          Download Pdf
        </Button>
      </div>
    </div>
  );
};

export default HtmlToPdf;
