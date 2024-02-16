import { useState } from "react";
import { Button, FileInput, Card, Label } from "flowbite-react";
import * as XLSX from "xlsx";
import { HiOutlineArrowRight } from "react-icons/hi";
import { FaCopy } from "react-icons/fa";
import Swal from "sweetalert2";
import html2pdf from "html2pdf.js";

const ExceltoPdf = () => {
  const [file, setFile] = useState(null);
  const [jsonData, setJsonData] = useState("");
  const [successUpload, setSuccessUpload] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleConvert = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);
        setJsonData(JSON.stringify(json, null, 2));
        setSuccessUpload(true);
      };
      reader.readAsBinaryString(file);
    }
  };

  const handleDownloadJson = () => {
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadPdf = () => {
    // Convert JSON data to HTML for PDF generation
    const htmlContent = `<pre>${jsonData}</pre>`;

    // Define options for pdf generation
    const options = {
      margin: 1,
      filename: "data.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    // Generate PDF
    html2pdf().set(options).from(htmlContent).save();
  };

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
    setFileName(uploadedFile.name);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(jsonData);
    Swal.fire({
      icon: "success",
      title: "json Copy ",
      text: "Json text has been copied to the clipboard.",
    });
  };

  return (
    <div>
      <div className="p-28 w-full">
        <Card href="#" className="w-full">
          <div className="flex w-full items-center justify-center">
            <Label
              htmlFor="dropzone-file"
              className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pb-6 pt-5">
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
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Only Excel file upload
                </p>
              </div>
              <FileInput
                type="file"
                accept=".xls,.xlsx"
                onChange={handleFileChange}
                id="dropzone-file"
                className="hidden"
              />
              {fileName && (
                <div className="text-center mt-4">
                  <p className="text-red-400 ">Uploaded File: {fileName}</p>
                </div>
              )}
            </Label>
          </div>
          <div className="inline-flex justify-around">
            <Button className="w-fit" onClick={handleConvert}>
              Convert to Json
              <HiOutlineArrowRight className="ml-2 h-5 w-5" />
            </Button>
            {successUpload && (
              <div className="flex">
                <button
                  onClick={handleDownloadJson}
                  className="text-xl box-border border-4 border-sky-900 w-48 h-16 bg-sky-600 text-white relative group mr-4"
                >
                  <span className="pr-8">Download Json</span>
                  <span className="bg-sky-900 absolute right-0 top-0  h-full flex items-center justify-center px-1 group-hover:duration-300 group-hover:w-full w-10 duration-300">
                    <FaCopy size={20} />
                  </span>
                </button>
                <button
                  onClick={handleDownloadPdf}
                  className="text-xl box-border border-4 border-sky-900 w-48 h-16 bg-sky-600 text-white relative group"
                >
                  <span className="pr-8">Download Pdf</span>
                  <span className="bg-sky-900 absolute right-0 top-0  h-full flex items-center justify-center px-1 group-hover:duration-300 group-hover:w-full w-10 duration-300">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="w-8 inline mx-auto"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path
                          d="M12 3V16M12 16L16 11.625M12 16L8 11.625"
                          stroke="#ffffff"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M15 21H9C6.17157 21 4.75736 21 3.87868 20.1213C3 19.2426 3 17.8284 3 15M21 15C21 17.8284 21 19.2426 20.1213 20.1213C19.8215 20.4211 19.4594 20.6186 19 20.7487"
                          stroke="#ffffff"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </g>
                    </svg>
                  </span>
                </button>
              </div>
            )}
          </div>
          <div className="min-w-screen min-h-screen bg-gray-50 gird  items-center justify-center">
            <div className=" lg:w-full bg-gray-800  rounded-lg overflow-hidden">
              <div className="flex justify-between">
                <div id="header-buttons" className="py-3 px-4 flex">
                  <div className="rounded-full w-3 h-3 bg-red-500 mr-2"></div>
                  <div className="rounded-full w-3 h-3 bg-yellow-500 mr-2"></div>
                  <div className="rounded-full w-3 h-3 bg-green-500"></div>
                </div>
                <div className="p-3 ">
                  <Button
                    onClick={copyToClipboard}
                    size="md"
                    type="primary"
                    circle={true}
                  >
                    <span>
                      <FaCopy size={24} />
                    </span>
                  </Button>
                </div>
              </div>
              <div
                id="code-area"
                className="py-4 px-4 mt-1 text-yellow-500 text-xl"
              >
                <pre>{jsonData}</pre>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ExceltoPdf;
