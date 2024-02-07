import { Button, Card } from "flowbite-react";
import { useState } from "react";
import * as XLSX from "xlsx";
import { HiOutlineArrowRight } from "react-icons/hi";
const ExcelToJson = () => {
  const [file, setFile] = useState(null);
  const [jsonData, setJsonData] = useState("");
  const [sucessupload, setsucessupload] = useState(false);

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
        setsucessupload(true);
      };
      reader.readAsBinaryString(file);
    }
  };

  const handleDownload = () => {
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

  return (
    <div>
      <div className="p-28 w-full">
        <Card href="#" className="w-full">
          <input
            type="file"
            accept=".xls,.xlsx"
            onChange={(e) => setFile(e.target.files[0])}
          />
          {/* --------button----- */}
          <div className="inline-flex justify-around ">
            <Button className="w-fit" onClick={handleConvert}>
              Convert Json
              <HiOutlineArrowRight className="ml-2 h-5 w-5" />
            </Button>

            {sucessupload && (
              <button
                onClick={handleDownload}
                className="text-xl box-border border-4 border-sky-900 
              w-48 h-16 bg-sky-600 text-white relative group"
              >
                <span className="pr-8">Download</span>
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
            )}
          </div>

          {/* --------- */}

          <div className="min-w-screen min-h-screen bg-gray-50 gird  items-center justify-center">
            <div className=" lg:w-full bg-gray-800  rounded-lg overflow-hidden">
              <div id="header-buttons" className="py-3 px-4 flex">
                <div className="rounded-full w-3 h-3 bg-red-500 mr-2"></div>
                <div className="rounded-full w-3 h-3 bg-yellow-500 mr-2"></div>
                <div className="rounded-full w-3 h-3 bg-green-500"></div>
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

export default ExcelToJson;
