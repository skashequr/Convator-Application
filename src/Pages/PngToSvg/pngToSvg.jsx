import { Button } from "flowbite-react";
import { useState } from "react";
import { pngToSvg } from "svg-png-converter";
import Swal from "sweetalert2";

const PngToSvgConverter = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [svgCode, setSvgCode] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      setImageUrl(event.target.result);
    };

    reader.readAsDataURL(file);
  };

  const convertToSvg = async () => {
    try {
      // Convert PNG image to SVG code
      const svg = await pngToSvg(imageUrl); // Use pngToSvg instead of png2svg

      // Set SVG code
      setSvgCode(svg);
    } catch (error) {
      console.error("Error converting PNG to SVG:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to convert PNG to SVG!",
      });
    }
  };

  const downloadSvg = () => {
    // Create a Blob object representing the data as an SVG image file
    const blob = new Blob([svgCode], { type: "image/svg+xml" });

    // Create a download link
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = "converted_image.svg";

    // Simulate click to trigger download
    downloadLink.click();

    // Clean up
    URL.revokeObjectURL(downloadLink.href);
  };

  return (
    <div>
      <input type="file" accept="image/png" onChange={handleFileChange} />
      <Button onClick={convertToSvg}>Convert PNG to SVG</Button>
      {svgCode && (
        <div>
          <textarea value={svgCode} readOnly />
          <Button onClick={downloadSvg}>Download SVG</Button>
        </div>
      )}
      {imageUrl && (
        <div>
          <img src={imageUrl} alt="Original PNG" />
        </div>
      )}
    </div>
  );
};

export default PngToSvgConverter;
