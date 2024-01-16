import { useState } from "react";

import FileInput from "./Inputfile";

import PdfViewer from "./Conveter";

function App() {
  const [pdfFile, setPdfFile] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="box">
        <FileInput onFileChange={(file) => setPdfFile(file)} />
      </div>
      {pdfFile && (
        <div className="w-full mt-4xl">
          <div>
            <PdfViewer
              pdfUrl={URL.createObjectURL(pdfFile)}
              fileName={pdfFile.name}
            ></PdfViewer>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
