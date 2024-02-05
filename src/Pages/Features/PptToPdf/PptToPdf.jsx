import { PDFDocument } from 'pdf-lib';

async function convertPPTtoPDF(pptFile) {
  try {
    const pptBytes = await pptFile.arrayBuffer();
    // Convert pptBytes to PDF bytes using your preferred method
    // For example, you could use a third-party conversion service or library
    // and fetch the PDF bytes.

    // For demonstration purposes, let's just create an empty PDF document
    const pdfDoc = await PDFDocument.create();
    const pdfBytes = await pdfDoc.save();

    // Return the converted PDF bytes
    return pdfBytes;
  } catch (error) {
    console.error('Error converting PPT to PDF:', error);
    throw error;
  }
}

export default convertPPTtoPDF;
