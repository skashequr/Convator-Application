import { Button, Card, FileInput, Label } from "flowbite-react";
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
    <div className="p-36 te bg-AllCard">
      <Card className=" bg-AllCard  text-AllTitle flex w-full items-center justify-center">
        {/* <input type="file" accept="image/jpeg" onChange={handleFileChange} /> */}
        <Label
          htmlFor="dropzone-file"
          className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
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
            <p className="mb-2 ">
              <span className="font-semibold"> upload</span> or drag and drop
            </p>
            <p className="text-xs">Only JPEG IMAGE upload</p>
          </div>
        </Label>
        <FileInput
          type="file"
          accept="image/jpeg"
          onChange={handleFileChange}
          id="dropzone-file"
          className="hidden"
        />
        <Button c onClick={convertToPng}>
          Convert to PNG
        </Button>
        {/* --------SHOW IMAGE ----------- */}

        <div className="flex gap-6">
          {imageUrl && (
            <div>
              <h2>Original Image (JPG)</h2>
              <img className="w-72 h-52" src={imageUrl} alt="Original JPG" />
            </div>
          )}
          {convertedUrl && (
            <div>
              <h2>Converted Image (PNG)</h2>
              <img
                className="w-72 h-52"
                src={convertedUrl}
                alt="Converted PNG"
              />
              <Button className="mt-4 sm:w-fit">
                <a href={convertedUrl} download="converted_image.png">
                  Download Image
                </a>
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default JpgToPngConverter;
