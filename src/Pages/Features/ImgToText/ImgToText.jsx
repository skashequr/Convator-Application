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
        <h1 className=''>Image to Text Converter</h1>
      </header>
      <div className=''>
        <div className=''>
            <button onClick={()=>setlan(!lan)}>
                {
                    lan? <span>English text Img Scan</span> : <span>Bangla text Img Scan</span>
                }
            </button>
          {isLoading ? <Loader /> : <>
            {!image ? <>
              <label className='label'>
                <div className='file-inner-container'>
                  <MdCloudUpload className='upload-icon' />
                  <p className='upload-text'>Click here to upload</p>
                </div>
                <input type='file' name='uploadimage' onChange={handleChange} className='upload' />
              </label>
            </> : <>
              <div className='dispaly-image'>
                <img src={image} alt="uploaded" className='uploaded-image' />
                 < MdDelete className='delete-icon' onClick={deleteImage} />
              </div>
            </>}
          </>}
        </div>
         <button onClick={handleClick} className='btn'>Convert to text</button>
        {progress < 100 && progress > 0 && <div>
          <div className="progress-label">Progress ({progress}%)</div>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${progress}%` }} ></div>
          </div>
        </div>}


        {text && <Copy text={text} />}
      </div>
    </div>
  );
}

export default ImgToText;
