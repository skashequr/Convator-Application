import { Button } from "flowbite-react";
import "./ImageResize.css";
import { useState, useRef } from "react";
import { Card } from "keep-react";
const ImageResizer = () => {
  // const [isActive, setIsActive] = useState(false);
  const [ogImageRatio, setOgImageRatio] = useState(null);
  const uploadBoxRef = useRef(null);
  const previewImgRef = useRef(null);
  const fileInputRef = useRef(null);
  const widthInputRef = useRef(null);
  const heightInputRef = useRef(null);
  const ratioInputRef = useRef(null);
  const qualityInputRef = useRef(null);
  0;

  const loadFile = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    previewImgRef.current.src = URL.createObjectURL(file);

    previewImgRef.current.addEventListener("load", () => {
      widthInputRef.current.value = previewImgRef.current.naturalWidth;
      heightInputRef.current.value = previewImgRef.current.naturalHeight;
      setOgImageRatio(
        previewImgRef.current.naturalWidth / previewImgRef.current.naturalHeight
      );
      uploadBoxRef.current.classList.add("active");
    });
  };

  const handleWidthInput = () => {
    const height = ratioInputRef.current.checked
      ? widthInputRef.current.value / ogImageRatio
      : heightInputRef.current.value;
    heightInputRef.current.value = Math.floor(height);
  };

  const handleHeightInput = () => {
    const width = ratioInputRef.current.checked
      ? heightInputRef.current.value * ogImageRatio
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

    ctx.drawImage(previewImgRef.current, 0, 0, canvas.width, canvas.height);

    a.href = canvas.toDataURL("image/jpeg", imgQuality);
    a.download = new Date().getTime().toString();
    a.click();
  };

  return (
    <div className="pt-28 flex gap-6 items-center justify-center bg-[#927DFC] mb-10">
      {/* <div className={`wrapper ${isActive ? "active" : ""}`} ref={uploadBoxRef}> */}
      <div className="wrapper" ref={uploadBoxRef}>
        <div
          className="upload-box"
          onClick={() => fileInputRef.current.click()}
        >
          <input
            type="file"
            accept="image/*"
            hidden
            ref={fileInputRef}
            onChange={loadFile}
          />
          <img
            src="https://www.codingnepalweb.com/demos/resize-and-compress-image-javascript/upload-icon.svg"
            alt=""
            ref={previewImgRef}
          />
          <p>Browse File to Upload</p>
        </div>
      </div>
      {/* ------------ */}
      <div>
        <Card className="w-full">
          <div className="content">
            <div className="row sizes">
              <div className="column width">
                <label>Width</label>
                <input
                  type="number"
                  ref={widthInputRef}
                  onKeyUp={handleWidthInput}
                />
              </div>
              <div className="column height">
                <label>Height</label>
                <input
                  type="number"
                  ref={heightInputRef}
                  onKeyUp={handleHeightInput}
                />
              </div>
            </div>
            <div className="row checkboxes">
              <div className="column ratio">
                <input type="checkbox" id="ratio" checked ref={ratioInputRef} />
                <label htmlFor="ratio">Lock aspect ratio</label>
              </div>
              <div className="column quality">
                <input type="checkbox" id="quality" ref={qualityInputRef} />
                <label htmlFor="quality">Reduce quality</label>
              </div>
            </div>
            <Button className="download-btn " onClick={resizeAndDownload}>
              Download Image
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ImageResizer;
