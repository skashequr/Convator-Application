
import { useState } from 'react';
import { Document, Page } from 'react-pdf';
const PdftoImage = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };
  const convertToImage = () => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const scale = 2; // Adjust as needed

    canvas.width = 595 * scale; // PDF width
    canvas.height = 842 * scale; // PDF height

    context.scale(scale, scale);

    const pdf = document.querySelector('.react-pdf__Page canvas');
    context.drawImage(pdf, 0, 0);

    const imageData = canvas.toDataURL('image/jpeg');
    console.log(imageData); // You can use imageData as needed (e.g., display or save it)
  };
  return (
    <div className='p-36'>
    <Document
      file="/path/to/your/pdf/document.pdf"
      onLoadSuccess={onDocumentLoadSuccess}
    >
      <Page pageNumber={pageNumber} />
    </Document>
    <p>Page {pageNumber} of {numPages}</p>
    <button onClick={convertToImage}>Convert to Image</button>
  </div>
  );
};

export default PdftoImage;