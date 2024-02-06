import { useRef, useState } from "react";

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
    <div className="p-28 gap-4 rounded shadow-md max-w-md w-full mx-auto">
      <div className="wrapper">
        <div className="upload-box">
          <img src={previewImage} alt="Preview" />
          <input type="file" ref={fileInputRef} onChange={loadFile} />
        </div>
        <div>
          <label>Width:</label>
          <input
            type="number"
            ref={widthInputRef}
            onKeyUp={handleWidthChange}
          />
        </div>
        <div>
          <label>Height:</label>
          <input
            type="number"
            ref={heightInputRef}
            onKeyUp={handleHeightChange}
          />
        </div>
        <div>
          <label>Lock Ratio:</label>
          <input type="checkbox" ref={ratioInputRef} />
        </div>
        <div>
          <label> Low-Quality:</label>
          <input type="checkbox" ref={qualityInputRef} />
        </div>
        <button className="download-btn" onClick={resizeAndDownload}>
          Download
        </button>
      </div>
    </div>
  );
}

export default ImageResizeTool;
