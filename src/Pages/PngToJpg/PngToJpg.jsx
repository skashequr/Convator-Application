import { Card, FileInput, Label } from "flowbite-react";
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { Button } from "keep-react";
import Swal from "sweetalert2";
import useUserConvertLimit from "../../Hooks/useUserConvertLimit";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
const fileTypes = ["PNG"];
const PngToJpgConverter = () => {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [convertedUrl, setConvertedUrl] = useState("");
  const axiosPublic = useAxiosPublic();
  const {
    currentUserConvertLimit,
    matchPaidStatus,
    updateValue,
    reload,
    user,
  } = useUserConvertLimit();

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
    if (currentUserConvertLimit > 0 || matchPaidStatus) {
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
      // --------------------------------------AccessCondition--Start-------------------------------------
      {
        currentUserConvertLimit > 0 &&
          axiosPublic
            .patch(`/user/update?email=${user?.email}`, {
              ConvertLimit: updateValue,
            })
            .then((res) => {
              console.log(res);
              reload();
              Swal.fire({
                position: "center",
                icon: "success",
                title: "You lose a Convert limitation",
                showConfirmButton: false,
                timer: 1500,
              });
            })
            .catch((err) => {
              console.log(err);
            });
      }
    } else {
      return Swal.fire({
        position: "top-end",
        icon: "error",
        title: "You have to get Subscription",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    // --------------------------------------AccessCondition--End-------------------------------------
  };

  return (
    <div className="p-36 text-titleColor ">
      <Card className="bg-AllCard  text-AllTitle flex w-full items-center justify-center">
        {/* <input
          type="file"
          id="DG"
          accept="image/png"
          onChange={handleFileChange}
        /> */}

        <Label
          htmlFor="dropzone-file"
          className="flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 "
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
              <span className="font-semibold"> upload</span> drag and drop
            </p>
            <p className="text-xs"> Png IMAGE upload</p>
          </div>
        </Label>

        <FileInput
          type="file"
          accept="image/jpeg"
          name="file"
          onChange={handleFileChange}
          types={fileTypes}
          id="dropzone-file"
          className="hidden"
        />

        {/* <FileUploader
          handleChange={handleChange}
          name="file"
          types={fileTypes}
        /> */}
        <Button onClick={convertToJpg} size="md" type="primary" pill={true}>
          Convert JPG and Download
        </Button>

        <div className="flex justify-center gap-4 sm:grid-flow-col items-center">
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
      </Card>
    </div>
  );
};

export default PngToJpgConverter;
