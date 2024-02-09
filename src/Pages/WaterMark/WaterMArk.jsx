import React, { useState } from 'react';
import { PDFDocument, rgb, degrees } from 'pdf-lib';

const AddWatermarkToPDF = () => {
  const [file, setFile] = useState(null);
  const [watermarkText, setWatermarkText] = useState('');
  const [outputFile, setOutputFile] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [fontSize, setFontSize] = useState(50);
  const [fontColor, setFontColor] = useState(rgb(0.5, 0.5, 0.5));

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleWatermarkTextChange = (e) => {
    setWatermarkText(e.target.value);
  };

  const handleRotationChange = (e) => {
    setRotation(parseInt(e.target.value));
  };

  const handleFontSizeChange = (e) => {
    setFontSize(parseInt(e.target.value));
  };

  const handleFontColorChange = (e) => {
    const color = e.target.value;
    const [r, g, b] = color.split(',').map(parseFloat);
    setFontColor(rgb(r, g, b));
  };

  const addWatermark = async () => {
    if (!file || !watermarkText) return;

    try {
      const existingPdfBytes = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(existingPdfBytes);

      const pages = pdfDoc.getPages();
      const firstPage = pages[0];

      const { width, height } = firstPage.getSize();
      const watermarkFontSize = fontSize;

      // Calculate the width and height of the watermark text
      const textWidth = watermarkFontSize * watermarkText.length / 2;
      const textHeight = watermarkFontSize / 2;

      // Calculate the center position of the page
      const centerX = width / 2;
      const centerY = height / 2;

      // Calculate the starting position for drawing the text
      const startX = centerX - textWidth / 2;
      const startY = centerY - textHeight / 2;

      firstPage.drawText(watermarkText, {
        x: startX,
        y: startY,
        size: watermarkFontSize,
        color: fontColor,
        rotate: degrees(rotation),
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      setOutputFile(blob);
    } catch (error) {
      console.error('Error adding watermark:', error);
    }
  };

  return (
    <div className='p-36'>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <input type="text" placeholder="Enter watermark text" value={watermarkText} onChange={handleWatermarkTextChange} />
      <div>
        <label>Rotation:</label>
        <input type="number" min="0" max="360" value={rotation} onChange={handleRotationChange} />
      </div>
      <div>
        <label>Font Size:</label>
        <input type="number" min="10" value={fontSize} onChange={handleFontSizeChange} />
      </div>
      <div>
        <label>Font Color:</label>
        <input type="text" placeholder="Enter RGB color (e.g., 0.5,0.5,0.5)" value={fontColor} onChange={handleFontColorChange} />
      </div>
      <button onClick={addWatermark}>Add Watermark</button>
      {outputFile && (
        <a href={URL.createObjectURL(outputFile)} download="watermarked_pdf.pdf">Download Watermarked PDF</a>
      )}
    </div>
  );
};

export default AddWatermarkToPDF;
