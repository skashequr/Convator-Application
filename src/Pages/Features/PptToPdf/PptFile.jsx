import React from 'react';
import convertPPTtoPDF from './PptToPdf';

class MyComponent extends React.Component {
  async handleConvertPPTtoPDF(pptFile) {
    try {
      const pdfBytes = await convertPPTtoPDF(pptFile);
      console.log('Converted PDF bytes:', pdfBytes);

      // Create a Blob object from the PDF bytes
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });

      // Create a temporary URL for the Blob
      const url = URL.createObjectURL(blob);

      // Create a link element
      const link = document.createElement('a');
      link.href = url;
      link.download = 'converted.pdf'; // Specify the filename for download
      document.body.appendChild(link);

      // Trigger the click event on the link
      link.click();

      // Cleanup
      URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error converting PPT to PDF:', error);
    }
  }

  render() {
    return (
      <div className='p-36'>
        <input type="file" onChange={(e) => this.handleConvertPPTtoPDF(e.target.files[0])} />
        <button onClick={() => {
          const fileInput = document.querySelector('input[type="file"]');
          if (fileInput && fileInput.files.length > 0) {
            this.handleConvertPPTtoPDF(fileInput.files[0]);
          } else {
            console.error('Please select a PPT file first.');
          }
        }}>Convert to PDF</button>
      </div>
    );
  }
}

export default MyComponent;
