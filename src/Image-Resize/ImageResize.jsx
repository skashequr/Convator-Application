import { useRef, useState } from "react";
import { Card, Checkbox, FileInput, Label } from "flowbite-react";

function ImageResizeTool() {
  const [previewImage, setPreviewImage] = useState("");
  const [originalImageRatio, setOriginalImageRatio] = useState(0);

  const fileInputRef = useRef(null);
  const widthInputRef = useRef(null);
  const heightInputRef = useRef(null);
  const ratioInputRef = useRef(null);
  const qualityInputRef = useRef(null);

  const loadFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function () {
      setPreviewImage(reader.result);
      const img = new Image();
      img.onload = function () {
        widthInputRef.current.value = img.naturalWidth;
        heightInputRef.current.value = img.naturalHeight;
        setOriginalImageRatio(img.naturalWidth / img.naturalHeight);
        document.querySelector(".wrapper").classList.add("active");
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  };

  const handleWidthChange = () => {
    const height = ratioInputRef.current.checked
      ? widthInputRef.current.value / originalImageRatio
      : heightInputRef.current.value;
    heightInputRef.current.value = Math.floor(height);
  };

  const handleHeightChange = () => {
    const width = ratioInputRef.current.checked
      ? heightInputRef.current.value * originalImageRatio
      : widthInputRef.current.value;
    widthInputRef.current.value = Math.floor(width);
  };

  const resizeAndDownload = () => {
    const canvas = document.createElement("canvas");
    const a = document.createElement("a");
    const ctx = canvas.getContext("2d");

    const imgQuality = qualityInputRef.current.checked ? 0.5 : 1.0;

    canvas.width = widthInputRef.current.value;
    canvas.height = heightInputRef.current.value;

    const img = new Image();
    img.onload = function () {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      a.href = canvas.toDataURL("image/jpeg", imgQuality);
      a.download = new Date().getTime().toString();
      a.click();
    };
    img.src = previewImage;
  };

  return (
    <div className="p-32 gap-4 w-full grid  items-center justify-center mx-auto  ">
      <Card className="wrapper">
        {/* ---------------file upload-------------- */}
        <div className=" w-full items-center upload-box justify-center">
          <Label
            htmlFor="dropzone-file"
            className="dark:hover:bg-bray-800 flex  w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
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
              <p>Upload Image</p>
            </div>
            <FileInput
              type="file"
              ref={fileInputRef}
              onChange={loadFile}
              id="dropzone-file"
              className="hidden"
            />{" "}
            <img className="w-96" src={previewImage} alt="" />
          </Label>
        </div>

        {/* ----------------input text data ------------------ */}
        <div className=" mt-8 grid grid-cols-2 gap-4 bg-gray-50  items-center justify-center">
          {/*----------------------------------------- width -----------------*/}
          <div className="flex flex-col">
            <label>Width:</label>

            <input
              type="number"
              ref={widthInputRef}
              onKeyUp={handleWidthChange}
              id="text"
              className="w-full max-w-lg rounded-lg border
               border-slate-200 px-2 py-1 hover:border-blue-500 focus:outline-none 
               focus:ring focus:ring-blue-500/40 active:ring active:ring-blue-500/40"
            />
          </div>
          {/* ---------height---------- */}
          <div className="flex flex-col">
            <label>Height:</label>

            <input
              type="number"
              ref={heightInputRef}
              onKeyUp={handleHeightChange}
              id="text"
              className="w-full max-w-lg rounded-lg border
               border-slate-200 px-2 py-1 hover:border-blue-500 focus:outline-none 
               focus:ring focus:ring-blue-500/40 active:ring active:ring-blue-500/40"
            />
          </div>
          {/* -----------lock-------- */}

          {/*  */}
          <div className="flex items-center gap-2">
            <Checkbox
              type="checkbox"
              ref={ratioInputRef}
              id="accept"
              defaultChecked
            />
            <Label htmlFor="accept" className="flex">
              Default Ratio&nbsp;
              <p className="text-cyan-600 hover:underline dark:text-cyan-500">
                Lock
              </p>
            </Label>
          </div>
          {/* -----quality------------- */}

          {/*  */}
          <div className="flex items-center gap-2">
            <Checkbox
              type="checkbox"
              ref={qualityInputRef}
              id="accept"
              defaultChecked
            />
            <Label htmlFor="accept" className="flex">
              Low-size&nbsp;
              <p className="text-cyan-600 hover:underline dark:text-cyan-500">
                Lock
              </p>
            </Label>
          </div>
          {/* ----------download------------- */}

          <div className="text-center justify-center mx-auto">
            <button
              onClick={resizeAndDownload}
              className="bg-[#5ab8ee] hover:bg-grey text-white font-bold py-2 px-4 rounded inline-flex items-center"
            >
              <svg
                className="w-4 h-4 mr-2 "
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
              </svg>
              <span>Download</span>
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default ImageResizeTool;
