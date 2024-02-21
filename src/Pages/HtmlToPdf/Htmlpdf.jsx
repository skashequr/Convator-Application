import { useState } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { Button, Card, FileInput, Label } from "flowbite-react";
import Swal from "sweetalert2";
import useUserConvertLimit from "../../Hooks/useUserConvertLimit";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const HtmlToPdf = () => {
  const [file, setFile] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false); // Corrected spelling
  const axiosPublic = useAxiosPublic();
  const { currentUserConvertLimit, matchPaidStatus, updateValue } =
    useUserConvertLimit();

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
    setFileName(uploadedFile.name);
    setPdfUrl(null);
  };

  const convertToPdf = async () => {
    if (!file) {
      alert("Please upload an HTML file.");
      return;
    }
    setLoading(true); // Start loading

    const reader = new FileReader();
    reader.onload = async () => {
      const htmlString = reader.result;
      const pdf = new jsPDF();
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = htmlString;

      const containerDiv = document.createElement("div");
      containerDiv.style.textAlign = "center";
      containerDiv.style.margin = "0 auto";
      containerDiv.appendChild(tempDiv);
      document.body.appendChild(containerDiv);

      try {
        const canvas = await html2canvas(containerDiv);
        const imgData = canvas.toDataURL("image/png");
        const imgWidth = 210;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);
        const pdfBlob = pdf.output("blob");
        const pdfUrl = URL.createObjectURL(pdfBlob);
        setPdfUrl(pdfUrl);
      } catch (error) {
        console.error("Error capturing canvas:", error);
      } finally {
        document.body.removeChild(containerDiv);
        // Turn off loading
        setLoading(false);
      }
    };
    reader.readAsText(file);
  };

  const downloadPdf = () => {
    if (currentUserConvertLimit > 0 || matchPaidStatus) {
      if (!pdfUrl) {
        Swal.fire("Download failed", "Please upload html file", "error");
        return;
      }

      const a = document.createElement("a");
      a.href = pdfUrl;
      a.download = `${file.name}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

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

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const uploadedFile = e.dataTransfer.files[0];
    setFile(uploadedFile);
    setFileName(uploadedFile.name);
  };

  return (
    <div className="pt-28">
      <Card href="#" className="w-full">
        <div className="flex w-full items-center justify-center">
          <Label
            onDragOver={handleDragOver}
            onDrop={handleDrop}
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
                Only Html file upload
              </p>
              <FileInput
                type="file"
                accept=".html"
                onChange={handleFileChange}
                id="dropzone-file"
                className="hidden"
              />
              <div className="text-center mt-4">
                {fileName && (
                  <div className="text-center mt-4">
                    <p className="text-red-400 ">Uploaded File: {fileName}</p>
                  </div>
                )}
              </div>
            </div>
          </Label>
        </div>
        {/* ----------button---------- */}
        <div className="circled gap-4  mx-auto flex  items-center justify-center divide-x divide-metal-200 rounded-md border border-metal-200 p-1 md:p-2">
          {loading ? (
            <Button type="outlinePrimary" size="md" disabled>
              <span className="pr-2">Loading...</span>
            </Button>
          ) : (
            <Button onClick={convertToPdf}>Convert into Pdf</Button>
          )}
          <Button onClick={downloadPdf}>Download Pdf</Button>
        </div>
      </Card>
    </div>
  );
};

export default HtmlToPdf;
