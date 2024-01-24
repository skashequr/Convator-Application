// ImageOptmiz.jsx
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import Compressor from "compressorjs";
import { Button } from "keep-react";

const ImageOptmiz = () => {
  const [optimizedImage, setOptimizedImage] = useState(null);

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    try {
      const compressedImage = await compressImage(file);
      setOptimizedImage(compressedImage);
    } catch (error) {
      console.error("Error compressing image:", error);
    }
  };

  const compressImage = (file) => {
    return new Promise((resolve, reject) => {
      new Compressor(file, {
        quality: 0.6,
        success(result) {
          resolve(result);
        },
        error(error) {
          reject(error);
        },
      });
    });
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  const downloadOptimizedImage = () => {
    if (optimizedImage) {
      const url = URL.createObjectURL(
        new Blob([optimizedImage.data], { type: optimizedImage.type })
      );

      const suggestedFileName = optimizedImage.name || "optimized_image.jpg";

      const userInput =
        ("Enter a name for the downloaded file:", suggestedFileName);

      if (userInput) {
        const a = document.createElement("a");
        a.href = url;
        a.download = userInput;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    }
  };

  return (
    <div className="">
          <div {...getRootProps()} style={dropzoneStyles}>
              {/* file added which is optimizeing */}
        <form>
          <input {...getInputProps()} />
        </form>
        <p>Drag & drop an image here, or click to select one</p>
      </div>
      {optimizedImage && (
        <div className="mx-auto w-full">
          <p className="text-5xl">Optimized Image:</p>
          <img
            src={`https://i.ibb.co/N3nxv34/1703485850643-removebg-preview.png`}
            alt="Optimized"
            style={imageStyles}
          />
          <Button className="p-2" onClick={downloadOptimizedImage}>
            Download Optimized Image
          </Button>
        </div>
      )}
    </div>
  );
};

const dropzoneStyles = {
  border: "2px dashed #aaa",
  borderRadius: "4px",
  padding: "20px",
  textAlign: "center",
  cursor: "pointer",
};

const imageStyles = {
  maxWidth: "100%",
  maxHeight: "300px",
  marginTop: "10px",
};

export default ImageOptmiz;
