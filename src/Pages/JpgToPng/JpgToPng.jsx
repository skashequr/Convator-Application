import { useState } from "react";

const JpgToPngConverter = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [convertedUrl, setConvertedUrl] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      setImageUrl(event.target.result);
    };

    reader.readAsDataURL(file);
  };

  const convertToPng = () => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      const pngUrl = canvas.toDataURL("image/png");
      setConvertedUrl(pngUrl);

      // Create a download link for the converted PNG image
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = "converted_image.png";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    };
    img.src = imageUrl;
  };

  return (
    <div className="p-36 text-TextColor bg-gradient-to-r from-cardBgHexaPrimary to-cardBgHexaSecondary ">
      <input type="file" accept="image/jpeg" onChange={handleFileChange} />
      <button onClick={convertToPng}>Convert to PNG</button>
      {imageUrl && (
        <div>
          <h2>Original Image (JPG)</h2>
          <img src={imageUrl} alt="Original JPG" />
        </div>
      )}
      {convertedUrl && (
        <div>
          <h2>Converted Image (PNG)</h2>
          <img src={convertedUrl} alt="Converted PNG" />
          <a href={convertedUrl} download="converted_image.png">
            Download Converted Image
          </a>
        </div>
      )}
    </div>
  );
};

export default JpgToPngConverter;
