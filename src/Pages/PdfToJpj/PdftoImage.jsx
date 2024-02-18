import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { saveAs } from 'file-saver';

const PdftoImage = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pdfData, setPdfData] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };
  const convertToImage = () => {
    if (!pdfData) {
      console.error('PDF data is not available.');
      return;
    }
  
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const scale = 2; // Adjust as needed
  
    canvas.width = 595 * scale; // PDF width
    canvas.height = 842 * scale; // PDF height
  
    context.scale(scale, scale);
  
    const pdf = document.querySelector('.react-pdf__Page canvas');
    if (!pdf) {
      console.error('PDF canvas element not found.');
      return;
    }
    
    context.drawImage(pdf, 0, 0);
  
    canvas.toBlob((blob) => {
      saveAs(blob, 'page.jpg');
    });
  };
  

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
      setPdfData(e.target.result);
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className='p-36'>
      <input type='file' onChange={handleFileChange} />
      {pdfData && (
        <>
          <Document
            file={{ data: pdfData }}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} />
          </Document>
          <p>
            Page {pageNumber} of {numPages}
          </p>
          <button onClick={convertToImage}>Convert to Image</button>
        </>
      )}
    </div>
  );
};

export default PdftoImage;
