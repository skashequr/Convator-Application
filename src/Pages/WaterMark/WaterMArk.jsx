import { useState } from "react";
import { PDFDocument, rgb, degrees } from "pdf-lib";
import { Card, FileInput, Label } from "flowbite-react";

const AddWatermarkToPDF = () => {
  const [file, setFile] = useState(null);
  const [watermarkText, setWatermarkText] = useState("");
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
    const [r, g, b] = color.split(",").map(parseFloat);
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
      const textWidth = (watermarkFontSize * watermarkText.length) / 2;
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
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      setOutputFile(blob);
    } catch (error) {
      console.error("Error adding watermark:", error);
    }
  };

  return (
    <div className="p-32 bg-AllCard gap-4 w-full grid  items-center justify-center mx-auto ">
      {/* ---------card ----------- */}
      <Card className=" rounded-lg shadow-xl">
        <h3 className="text-center font-extrabold text-3xl">Add Watermark</h3>

        <div className=" w-full items-center upload-box justify-center">
          <Label
            htmlFor="dropzone-file"
            className="dark:hover:bg-bray-800 flex p-4 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex p-4 flex-col items-center justify-center pb-6 pt-5">
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
              <p>Upload Pdf file</p>
            </div>
            <FileInput
              type="file"
              onChange={handleFileChange}
              // ref={fileInputRef}

              id="dropzone-file"
              className="hidden"
            />{" "}
          </Label>
        </div>

        {/* -------------- input deatils--------- */}

        <div className=" mt-8 p-3 sm:flex grid grid-cols-2 gap-4 bg-gray-50  items-center justify-center">
          {/*----------------------------------------- input watermark text -----------------*/}
          <div className="flex flex-col">
            <label>add text</label>

            <input
              type="text"
              placeholder="Enter watermark text"
              value={watermarkText}
              onChange={handleWatermarkTextChange}
              id="text"
              className="w-full max-w-lg rounded-lg border
               border-slate-200 px-2 py-1 hover:border-blue-500 focus:outline-none 
               focus:ring focus:ring-blue-500/40 active:ring active:ring-blue-500/40"
            />
          </div>
          {/* --------- ROtation---------- */}
          <div className="flex flex-col">
            <label>Rotation</label>

            <input
              type="number"
              min="0"
              max="360"
              value={rotation}
              onChange={handleRotationChange}
              id="text"
              placeholder="RotationChange"
              className="w-full max-w-lg rounded-lg border
               border-slate-200 px-2 py-1 hover:border-blue-500 focus:outline-none 
               focus:ring focus:ring-blue-500/40 active:ring active:ring-blue-500/40"
            />
          </div>
          {/* -------font size--------- */}
          <div className="flex flex-col">
            <label>Font-Size:</label>
            <input
              type="number"
              min="10"
              value={fontSize}
              onChange={handleFontSizeChange}
              id="text"
              className="w-full max-w-lg rounded-lg border
               border-slate-200 px-2 py-1 hover:border-blue-500 focus:outline-none 
               focus:ring focus:ring-blue-500/40 active:ring active:ring-blue-500/40"
            />
          </div>

          {/* ----------font color -------- */}
          <div className="flex flex-col">
            <label>Color:</label>
            <input
              type="text"
              placeholder="Enter RGB color (e.g., 0.5,0.5,0.5)"
              value={fontColor}
              onChange={handleFontColorChange}
              id="text"
              className="w-full max-w-lg rounded-lg border
               border-slate-200 px-2 py-1 hover:border-blue-500 focus:outline-none 
               focus:ring focus:ring-blue-500/40 active:ring active:ring-blue-500/40"
            />
          </div>

          {/* ----------download------------- */}

          <div className="text-center flex justify-center gap-4 mx-auto">
            <button
              onClick={addWatermark}
              className="bg-[#5ab8ee] hover:bg-grey text-white font-bold py-2 px-4 rounded inline-flex items-center"
            >
              <span>Add watermark</span>
            </button>

            {/*  */}
            {outputFile && (
              <a
                href={URL.createObjectURL(outputFile)}
                download="watermarked_pdf.pdf"
              >
                <button className="bg-[#5ab8ee] hover:bg-grey text-white font-bold py-2 px-4 rounded inline-flex items-center">
                  <svg
                    className="w-4 h-4 mr-2 "
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                  </svg>
                  <span>Download Pdf File</span>
                </button>
              </a>
            )}
          </div>
          {/* ------------ */}
        </div>

        {/* <input
          type="text"
          placeholder="Enter watermark text"
          value={watermarkText}
          onChange={handleWatermarkTextChange}
        />
        <div>
          <label>Rotation:</label>
          <input
            type="number"
            min="0"
            max="360"
            value={rotation}
            onChange={handleRotationChange}
          />
        </div>
        <div>
          <label>Font Size:</label>
          <input
            type="number"
            min="10"
            value={fontSize}
            onChange={handleFontSizeChange}
          />
        </div>
        <div>
          <label>Font Color:</label>
          <input
            type="text"
            placeholder="Enter RGB color (e.g., 0.5,0.5,0.5)"
            value={fontColor}
            onChange={handleFontColorChange}
          />
        </div>
        <button onClick={addWatermark}>Add Watermark</button>
        {outputFile && (
          <a
            href={URL.createObjectURL(outputFile)}
            download="watermarked_pdf.pdf"
          >
            Download Watermarked PDF
          </a>
        )} */}
      </Card>
    </div>
  );
};

export default AddWatermarkToPDF;
