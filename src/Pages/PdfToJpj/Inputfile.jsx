import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types"; // Add this import
import uploadImg from "../../assets/upload.png";
import filePdf from "../../assets/pdf.png";

const FileInput = (props) => {
  const wrapperRef = useRef(null);

  const [file, setFile] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    props.onFileChange(file);
  }, [file]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const onDragEnter = () => wrapperRef.current.classList.add("dragover");

  const onDragLeave = () => wrapperRef.current.classList.remove("dragover");

  const onDrop = () => wrapperRef.current.classList.remove("dragover");

  const onFileDrop = (e) => {
    const newFile = e.target.files[0];
    if (newFile && newFile.type === "application/pdf") {
      setFile(newFile);
    } else {
      setOpen(true);
    }
  };

  const returnSize = (file) => {
    const fileSizeInBytes = file.size;
    let fileSize;

    if (fileSizeInBytes >= 1048576) {
      fileSize = (fileSizeInBytes / 1048576).toFixed(2) + " MB";
    } else {
      fileSize = (fileSizeInBytes / 1024).toFixed(2) + " KB";
    }
    return fileSize;
  };

  return (
    <>
      <div className="flex-row space-x-1 justify-center items-center mb-3">
        <p className="text-4xl font-bold uppercase text-primary">PDF</p>
        <p className="text-4xl font-bold uppercase text-gray-700">to Image</p>
      </div>
      {!file && (
        <label
          ref={wrapperRef}
          className="drop-file-input cursor-pointer"
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        >
          <div className="drop-file-input__label">
            <img src={uploadImg} alt="" />
            <p>Drag & Drop your files here</p>
          </div>
          <input
            type="file"
            accept=".pdf"
            value=""
            onChange={onFileDrop}
            className="hidden"
          />
        </label>
      )}
      {file ? (
        <div className="drop-file-preview">
          <p className="drop-file-preview__title">Uploaded file</p>
          <div className="drop-file-preview__item flex items-center">
            <img src={filePdf} alt="PDF Icon" />
            <div className="drop-file-preview__item__info ml-2">
              <p>{file.name}</p>
              <p>{returnSize(file)}</p>
            </div>
            <button onClick={() => setFile(null)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6 text-gray-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      ) : null}
      {open && (
        <div
          className="fixed top-0 right-0 m-4 p-4 bg-red-500 text-white"
          onClick={handleClose}
        >
          Please upload PDF only
        </div>
      )}
    </>
  );
};

FileInput.propTypes = {
  onFileChange: PropTypes.func,
};

export default FileInput;
