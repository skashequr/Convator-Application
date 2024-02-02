import { useState } from "react";
import FileInput from "./Inputfile";

import PdfViewer from "./Conveter";
import Downloadimg from "../PdfToJpj/Downloadimg";
import DisplayImage from "./Displayimage";
function PdfToImg() {
  const [pdfFile, setPdfFile] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-TextColor bg-gradient-to-r from-cardBgHexaPrimary to-cardBgHexaSecondary">
      <div className="box">
        <FileInput onFileChange={(file) => setPdfFile(file)} />
      </div>
      {pdfFile && (
        <div className="w-full mt-4xl">
          <div>
            okkk Sheikh
            <Downloadimg></Downloadimg>
          </div>
          <DisplayImage></DisplayImage>
          <PdfViewer></PdfViewer>
        </div>
      )}
    </div>
  );
}

export default PdfToImg;
