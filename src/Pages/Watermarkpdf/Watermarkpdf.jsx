import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import jsPDF from "jspdf";
import { Button } from "keep-react";
import { TextInput } from "keep-react";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const PdfWatermarkApp = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [file, setFile] = useState(null);
  const [watermarkText, setWatermarkText] = useState("");

  const onFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const addWatermark = () => {
    if (!file || !watermarkText) return;

    const pdfDoc = new jsPDF();

    for (let i = 1; i <= numPages; i++) {
      pdfDoc.setPage(i);
      pdfDoc.text(20, pdfDoc.internal.pageSize.height - 20, watermarkText);
    }

    const blob = pdfDoc.output("blob");
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "watermarked.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div>
      {/* ------------file upload----------- */}
      <div className="flex items-center justify-center bg-grey-lighter w-full h-screen">
        <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">
          <svg
            className="w-8 h-8"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
          </svg>
          <span className="mt-2 text-base leading-normal">Select a file</span>
          <input type="file" onChange={onFileChange} className="hidden" />
        </label>
      </div>
      {/* -------------file ----- */}
      {file && (
        <div className="mt-2">
          {/* --------------- */}
          <div className="flex items-center gap-4 justify-center ">
            <TextInput
              type="text"
              placeholder="Enter Watermark Text"
              value={watermarkText}
              onChange={(e) => setWatermarkText(e.target.value)}
              required
            />

            <Button size="md" onClick={addWatermark} type="primary" pill={true}>
              Add Watermark
            </Button>
          </div>
          {/* ---------------document------------ */}
          <Document
            className="mt-6 p-3 grid grid-cols-2 items-center"
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            {[...Array(numPages)].map((_, index) => (
              <Page key={index + 1} pageNumber={index + 1} />
            ))}
          </Document>
        </div>
      )}
    </div>
  );
};

export default PdfWatermarkApp;
