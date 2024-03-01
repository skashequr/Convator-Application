import { useState } from "react";
import { Button, Card, Label } from "flowbite-react";
import * as XLSX from "xlsx";
import Swal from "sweetalert2";
import useUserConvertLimit from "../../Hooks/useUserConvertLimit";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const ExcelToHtmlTable = () => {
  const [file, setFile] = useState(null);
  const [htmlTable, setHtmlTable] = useState(null);
  const axiosPublic = useAxiosPublic();
  const {
    currentUserConvertLimit,
    matchPaidStatus,
    updateValue,
    reload,
    user,
  } = useUserConvertLimit();

  const handleConvert = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const htmlStr = XLSX.utils.sheet_to_html(worksheet);
        setHtmlTable(htmlStr);
      };
      reader.readAsBinaryString(file);
    }
  };

  const handleDownload = () => {
    if (currentUserConvertLimit > 0 || matchPaidStatus) {
      const blob = new Blob([htmlTable], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "table.html";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

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

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
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
                  Excel file upload
                </p>
              </div>
              <input
                type="file"
                accept=".xls,.xlsx"
                onChange={handleFileChange}
                id="dropzone-file"
                className="hidden"
              />
            </Label>
          </div>
          <div className="inline-flex justify-around">
            <Button className="w-fit" onClick={handleConvert}>
              Convert Excel to HTML Table
            </Button>
            {htmlTable && (
              <button
                onClick={handleDownload}
                className="text-xl box-border border-4 border-sky-900 w-48 h-16 bg-sky-600 text-white relative group"
              >
                <span className="pr-8">Download HTML</span>
              </button>
            )}
          </div>
          {htmlTable && (
            <div className="min-w-screen min-h-screen bg-gray-50 grid items-center justify-center">
              <div className="lg:w-full bg-gray-800 rounded-lg overflow-hidden">
                <div id="header-buttons" className="py-3 px-4 flex">
                  <div className="rounded-full w-3 h-3 bg-red-500 mr-2"></div>
                  <div className="rounded-full w-3 h-3 bg-yellow-500 mr-2"></div>
                  <div className="rounded-full w-3 h-3 bg-green-500"></div>
                </div>
                <div
                  id="excel-table"
                  className="py-4 px-4 mt-1 text-yellow-500 text-xl"
                  dangerouslySetInnerHTML={{ __html: htmlTable }}
                ></div>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ExcelToHtmlTable;
