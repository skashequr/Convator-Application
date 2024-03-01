import axios from "axios";
import { Card, FileInput, Label, Button } from "flowbite-react";

import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { HiOutlineArrowRight } from "react-icons/hi";

const PptToPdf = () => {
  const [file, setFile] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      await axios.post(
        "http://localhost:5000/convert/ppttopdfconvert",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setLoading(false);
    } catch (error) {
      console.error("Error uploading file:", error);
      setError(error.message);
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
    setFileName(uploadedFile.name);
  };

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const response = await axios.get(
        "http://localhost:5000/convert/getppttopf",
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "converted.pdf");
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
    <div className="pt-28 shadow-xl ">
      <Helmet></Helmet>
      <Card className="bg-AllCard text-AllTitle">
        <h2 className="text-2xl text-center">Upload PDF File</h2>
        <form onSubmit={handleSubmit}>
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
                Powerpoint file upload
              </p>
            </div>
            <FileInput
              accept=".ppt"
              type="file"
              onChange={handleFileChange}
              id="dropzone-file"
              className="hidden"
            />
            {fileName && (
              <div className="text-center p-3 border-green-950 mt-4">
                <p className="text-blue-400 ">Uploaded File: {fileName}</p>
              </div>
            )}
          </Label>

          <div className="mt-4 circled mx-auto flex  items-center justify-center divide-x divide-metal-200 rounded-md border border-metal-200 p-1 md:p-2">
            {" "}
            <Button type="submit" disabled={loading}>
              Upload file
              <HiOutlineArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </form>
        {loading && <div>Loading...</div>}
        {error && <div>Error: {error}</div>}
        <Button
          className=" circled mx-auto flex  items-center justify-center divide-x divide-metal-200 rounded-md border border-metal-200 p-1 md:p-2"
          onClick={handleDownload}
          disabled={downloading || loading}
        >
          {downloading ? "Downloading..." : "Download PDF"}
        </Button>
      </Card>
    </div>
  );
};

export default PptToPdf;
