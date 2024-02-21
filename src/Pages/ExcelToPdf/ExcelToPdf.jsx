import { useState } from "react";
// Assuming you have a Loader component
import { Button, FileInput, Card, Label } from "flowbite-react";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";

import { Spinner } from "keep-react";
import Swal from "sweetalert2";
import useUserConvertLimit from "../../Hooks/useUserConvertLimit";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const ExcelToPdf = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [conversionComplete, setConversionComplete] = useState(false);
  //  loading indicator
  const [loading, setLoading] = useState(false);
  const axiosPublic = useAxiosPublic();
  const { currentUserConvertLimit, matchPaidStatus, updateValue } =
    useUserConvertLimit();

  const handleConvert = () => {
    if (file) {
      setLoading(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const html = XLSX.utils.sheet_to_html(worksheet);

        //------------ Convert HTML to PDF--------------
        const doc = new jsPDF({
          //  'landscape'
          orientation: "portrait",
          unit: "mm",
          format: "a4",
          font: "Arial",
          fontStyle: "normal",
          fontSize: 10,
          x: 10,
          y: 10,
        });
        doc.html(html, {
          callback: function (pdf) {
            pdf.save("converted.pdf");
            setConversionComplete(true);
            // Set loading to false when conversion completes
            setLoading(false);
          },

          html2canvas: { scale: 1 },
        });
      };
      reader.readAsBinaryString(file);
    }
  };

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
    setFileName(uploadedFile.name);
  };

  const handleDownloadPdf = () => {
    if (currentUserConvertLimit > 0 || matchPaidStatus) {
      // Trigger the download of the PDF file
      const doc = new jsPDF();
      doc.save("converted.pdf");
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
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
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
          {/* -----------button part-------- */}
          <div className="circled gap-4 mx-auto flex  items-center justify-center divide-x divide-metal-200 rounded-md border border-metal-200 p-1 md:p-2">
            <Button className="w-fit" onClick={handleConvert}>
              Convert to PDF
            </Button>
            {loading ? (
              <Button type="outlinePrimary" size="md">
                <span className="pr-2">
                  <Spinner color="info" size="md" />
                </span>
                Loading...
              </Button>
            ) : (
              conversionComplete && (
                <Button className="w-fit" onClick={handleDownloadPdf}>
                  Download PDF
                </Button>
              )
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ExcelToPdf;
