import React, { useState } from "react";
import { Document, Page } from "react-pdf";
import { FileUploader } from "react-drag-drop-files";

const PdfEditor = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pdfFile, setPdfFile] = useState(null);

  const fileTypes = ["pdf"];

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handleChange = (file) => {
    setPdfFile(file);
  };

  const handlePageChange = (newPageNumber) => {
    setPageNumber(newPageNumber);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setPdfFile(file);
  };

  return (
    <div className="container mx-auto p-4 ">
      <div className="mb-4 p-36">
        <input
          name="pdf"
          type="file"
          onChange={handleFileChange}
          className="mb-2"
        />
        <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
        <div>
          {pdfFile && (
            <div>
              <p>Selected PDF file: {pdfFile.name}</p>
              <p>File size: {pdfFile.size} bytes</p>
            </div>
          )}
        </div>
      </div>
      <div className="max-w-screen-sm mx-auto">
        <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} />
        </Document>
        <div className="flex justify-between items-center mt-4">
          <p>
            Page {pageNumber} of {numPages}
          </p>
          <div className="flex space-x-4">
            <button
              onClick={() => handlePageChange(pageNumber - 1)}
              disabled={pageNumber <= 1}
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
                pageNumber <= 1 && "opacity-50 cursor-not-allowed"
              }`}
            >
              Previous Page
            </button>
            <button
              onClick={() => handlePageChange(pageNumber + 1)}
              disabled={pageNumber >= numPages}
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
                pageNumber >= numPages && "opacity-50 cursor-not-allowed"
              }`}
            >
              Next Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PdfEditor;
