import { useState } from "react";
import { PDFDocument, rgb, degrees } from "pdf-lib";
import { Card, FileInput, Label } from "flowbite-react";
import useUserConvertLimit from "../../Hooks/useUserConvertLimit";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";

const AddWatermarkToPDF = () => {
  const [file, setFile] = useState(null);
  const [watermarkText, setWatermarkText] = useState("");
  const [outputFile, setOutputFile] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [fontSize, setFontSize] = useState(50);

  const axiosPublic = useAxiosPublic();
  const [fileName, setfileName] = useState();
  const {
    currentUserConvertLimit,
    matchPaidStatus,
    updateValue,
    reload,
    user,
  } = useUserConvertLimit();

  //--- Set default color to black color--
  const [textColor, setTextColor] = useState("#000000");

  const handleTextColorChange = (e) => {
    setTextColor(e.target.value);
  };
  const hexToRgb = (hex) => {
    // Remove '#' if present
    hex = hex.replace(/^#/, "");

    // Parse hex values to RGB
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return [r / 255, g / 255, b / 255];
  };

  //  ------file upload---------
  const handleFileChange = (e) => {
    const fileloaded = e.target.files[0];
    setFile(fileloaded);
    setfileName(fileloaded.name);
  };

  const handleWatermarkTextChange = (e) => {
    setWatermarkText(e.target.value);
  };

  // ---------roted-----------
  const handleRotationChange = (e) => {
    setRotation(parseInt(e.target.value));
  };

  //----------- font size----
  const handleFontSizeChange = (e) => {
    setFontSize(parseInt(e.target.value));
  };

  const addWatermark = async () => {
    if (currentUserConvertLimit > 0 || matchPaidStatus) {
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
          color: rgb(...hexToRgb(textColor)),
          rotate: degrees(rotation),
        });

        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: "application/pdf" });
        setOutputFile(blob);
      } catch (error) {
        console.error("Error adding watermark:", error);
      }

      // --------------------------------------AccessCondition--Start-------------------------------------
      {
        currentUserConvertLimit > 0 &&
          axiosPublic
            .patch(`/user/update?email=${user?.email}`, {
              ConvertLimit: updateValue,
            })
            .then((res) => {
              console.log(res);
              reload();
              Swal.fire({
                position: "center",
                icon: "success",
                title: "You lose a Convert limitation",
                showConfirmButton: false,
                timer: 1500,
              });
            })
            .catch((err) => {
              console.log(err);
            });
      }
    } else {
      return Swal.fire({
        position: "top-end",
        icon: "error",
        title: "You have to get Subscription",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    // --------------------------------------AccessCondition--End-------------------------------------
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
              {fileName && <p>Upload Pdf file:-{fileName}</p>}
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

        <div className=" mt-8 p-3 sm:flex  gap-4 bg-gray-50  items-center justify-center">
          <div className="grid">
            {/*----------------------------------------- input watermark text -----------------*/}
            <div className="">
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
            <div className="">
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
          </div>
          {/* --------- */}
          <div className="grid">
            {/* -------font size--------- */}
            <div className="">
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
            <div className="">
              <label>Text Color:</label>
              <input
                type="color"
                value={textColor}
                onChange={handleTextColorChange}
                id="text-color"
                className="w-full max-w-lg rounded-lg border
      border-slate-200 px-2 py-1 hover:border-blue-500 focus:outline-none 
      focus:ring focus:ring-blue-500/40 active:ring active:ring-blue-500/40"
              />
            </div>
          </div>
        </div>
        {/* ----------download------------- */}

        <div className="circled mx-auto flex items-center justify-center divide-x gap-4 divide-metal-200 rounded-md border border-metal-200 p-1 md:p-2">
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
      </Card>
    </div>
  );
};

export default AddWatermarkToPDF;
