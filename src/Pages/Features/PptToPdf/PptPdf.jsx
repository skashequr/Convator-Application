// src/components/FileUpload.js
import { useState } from "react";
import axios from "axios";
// import {  } from "keep-react";
import { Button, Card, FileInput, Label, Spinner } from "flowbite-react";
import { HiOutlineArrowRight } from "react-icons/hi";
const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState(null);
  const [lodding, setLodding] = useState(true);
  const [lodFile, setLodFile] = useState(true);
  const [fileName, setFileName] = useState("");
  // Handle file selection
  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
    setFileName(uploadedFile.name);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    setLodFile(false);
    try {
      // Make the Axios request
      const response = await axios.post(
        "http://localhost:5000/convert",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setLodding(false);
      console.log("File uploaded successfully:", response.data);
      // Handle success (you can update UI or perform other actions here)
    } catch (error) {
      console.error("Error uploading file:", error);
      setLodding(true);
      // Handle error (display an error message or take appropriate action)
    }
  };

  const handleDownload = async () => {
    try {
      setDownloading(true);

      const response = await axios.get("http://localhost:5000/convert", {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "data.pdf");
      document.body.appendChild(link);
      link.click();

      setDownloading(false);
    } catch (error) {
      console.error("Error downloading file:", error);
      setError(error.message);
      setDownloading(false);
    }
  };
  return (
    <div className="p-36 w-full  rounded-lg shadow-2xl ">
      <Card className=" p-3 we-full bg-AllCard text-AllTitle items-center justify-center ">
        <h2 className="text-2xl text-AllTitle">
          {" "}
          Document File convert Pdf file
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="w-full flex p-3 items-center justify-center">
            <Label
              htmlFor="dropzone-file"
              className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex p-3 flex-col items-center justify-center pb-6 pt-5">
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
                  <span className="font-semibold"> upload</span>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Docex file upload
                </p>
              </div>
              <FileInput
                accept=".doc, .docx"
                type="file"
                onChange={handleFileChange}
                id="dropzone-file"
                className="hidden"
              />
              {fileName && (
                <div className="text-center p-3 mt-4">
                  <p className="text-red-400 ">Uploaded File: {fileName}</p>
                </div>
              )}
            </Label>
          </div>
          {/* <button >Upload</button> */}
          <div>
            <Button type="submit">
              Upload file
              <HiOutlineArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </form>
        {lodFile ? (
          " "
        ) : (
          <div className="text-center">
            {lodding ? (
              <Spinner color="info" size="xl" />
            ) : (
              // <button onClick={handleDownload} disabled={downloading}>
              //   {downloading ? "Downloading..." : "Download File"}
              // </button>
              <button
                onClick={handleDownload}
                disabled={downloading}
                className="bg-[#5ab8ee] hover:bg-grey text-white font-bold py-2 px-4 rounded inline-flex items-center"
              >
                <svg
                  className="w-4 h-4 mr-2 "
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                </svg>
                <span> {downloading ? "Downloading..." : "Download File"}</span>
              </button>
            )}

            {error && <div>Error: {error}</div>}
          </div>
        )}
      </Card>
    </div>
  );
};

export default FileUpload;
