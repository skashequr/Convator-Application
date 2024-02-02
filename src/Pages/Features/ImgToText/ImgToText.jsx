import React, { useState, useEffect } from "react";
import Tesseract from "tesseract.js";
import Loader from "./Loader";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import Copy from "./Coppy";
import toast from "react-hot-toast";
import Dropzone from "react-dropzone";

function ImgToText() {
  const [image, setImage] = useState(null);
  const [text, setText] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState("eng");

  const handleChange = (files) => {
    setIsLoading(true);
    setImage(files[0]);
    setIsLoading(false);
  };

  const deleteImage = () => {
    setIsLoading(true);
    setImage(null);
    setIsLoading(false);
  };

  const handleClick = () => {
    if (!image) {
      toast.error("Please upload the image!");
      return;
    }

    setIsLoading(true);
    Tesseract.recognize(image, language, {
      logger: (m) => {
        setProgress(parseInt(m.progress * 100));
      },
    })
      .catch((err) => {
        console.error(err);
      })
      .then((result) => {
        let text = result.data.text;
        setText(text);
        setIsLoading(false);
      });
  };

  const handleUpload = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setIsLoading(true);

    const url = "https://api.escuelajs.co/api/v1/files/upload";
    const formData = new FormData();
    formData.append("file", file);

    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          setImage(URL.createObjectURL(file));
          setIsLoading(false);
        } else {
          console.error(response);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="text-textColor py-32">
      <header>
        <h1 className="">Image to Text Converter</h1>
      </header>
      <div>
        <button onClick={() => setLanguage(language === "eng" ? "ben" : "eng")}>
          {language === "eng"
            ? "English text Img Scan"
            : "Bangla text Img Scan"}
        </button>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {!image ? (
              <>
                <label className="label">
                  {/* <div className="file-inner-container">
                    <MdCloudUpload className="upload-icon" />
                    <p className="upload-text">Click here to upload</p>
                  </div> */}
                  {/* <input
                    type="file"
                    name="uploadimage"
                    onChange={(e) => handleChange(e.target.files)}
                    className="upload"
                  /> */}

                  <div className="w-fit">
                    <Dropzone
                      onDrop={handleUpload}
                      accept="image/*"
                      minSize={1024}
                      maxSize={3072000}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps({ className: "dropzone" })}>
                          <input {...getInputProps()} />
                          <img
                            className="w-64"
                            src="https://cdn.dribbble.com/users/527271/screenshots/6090255/media/c8f4598d29e31001516bc06721fe4f49.gif"
                            alt=""
                          />
                        </div>
                      )}
                    </Dropzone>
                  </div>
                </label>
              </>
            ) : (
              <div>
                <img
                  src={image}
                  alt="uploaded"
                  className="uploaded-image w-64"
                />
                <MdDelete className="delete-icon" onClick={deleteImage} />
              </div>
            )}
          </>
        )}
        <button onClick={handleClick} className="btn">
          Convert to text
        </button>
        {progress < 100 && progress > 0 && (
          <div>
            <div className="progress-label">Progress ({progress}%)</div>
            <div className="progress-bar">
              <div className="progress" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        )}
        {text && <Copy text={text} />}
      </div>
    </div>
  );
}

export default ImgToText;
