import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["PNG"];
const PngToJpgConverter = () => {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [convertedUrl, setConvertedUrl] = useState("");
  console.log(file);
  const handleChange = (file) => {
    setFile(file);
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      setImageUrl(event.target.result);
    };

    reader.readAsDataURL(file);
  };

  const convertToJpg = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const jpgUrl = canvas.toDataURL("image/jpeg");
      setConvertedUrl(jpgUrl);

      // Create a download link for the converted JPG image
      const downloadLink = document.createElement("a");
      downloadLink.href = jpgUrl;
      downloadLink.download = "converted_image.jpg";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    };
    img.src = imageUrl;
  };

  return (
    <div className="p-36 text-TextColor bg-gradient-to-r from-cardBgHexaPrimary to-cardBgHexaSecondary">
      <input
        type="file"
        id="DG"
        accept="image/png"
        onChange={handleFileChange}
      />

      <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
      <button onClick={convertToJpg}>Convert to JPG</button>
      <div className="flex justify-center items-center">
        {imageUrl && (
          <div>
            <h2>Original Image (PNG)</h2>
            <div className="h-96 w-96">
              <img src={imageUrl} alt="Original PNG" />
            </div>
          </div>
        )}
        {convertedUrl && (
          <div>
            <h2>Converted Image (JPG)</h2>
            <div className="h-96 w-96">
              <img src={convertedUrl} alt="Converted JPG" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PngToJpgConverter;
