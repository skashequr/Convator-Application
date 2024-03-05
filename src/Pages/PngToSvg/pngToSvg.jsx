import { useState } from "react";
import { svg2png } from "svg-png-converter";

const SvgToPngConverter = () => {
  const [svgFile, setSvgFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "image/svg+xml") {
      setSvgFile(file);
    } else {
      alert("Please upload an SVG file.");
    }
  };

  const handleConvertToPng = async () => {
    try {
      const outputBuffer = await svg2png({
        input: await svgFile.arrayBuffer(),
        encoding: "buffer",
        format: "jpeg",
      });
      downloadFile(outputBuffer, "converted_image.jpeg", "image/jpeg");
    } catch (error) {
      console.error("Error converting SVG to JPEG:", error);
    }
  };

  const handleConvertToPngFormat = async () => {
    try {
      const outputBuffer = await svg2png({
        input: await svgFile.arrayBuffer(),
        encoding: "buffer",
        format: "png",
      });
      downloadFile(outputBuffer, "converted_image.png", "image/png");
    } catch (error) {
      console.error("Error converting SVG to PNG:", error);
    }
  };

  const downloadFile = (data, filename, type) => {
    const blob = new Blob([data], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="pt-28">
      <h2>SVG to Image Converter</h2>
      <input type="file" accept=".svg" onChange={handleFileChange} />
      <button onClick={handleConvertToPng}>Convert to JPEG</button>
      <button onClick={handleConvertToPngFormat}>Convert to PNG</button>
    </div>
  );
};

export default SvgToPngConverter;
