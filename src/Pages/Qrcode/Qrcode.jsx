import { useState } from "react";
import QRCode from "qrcode.react";
import { Button } from "flowbite-react";
import Swal from "sweetalert2";
import useUserConvertLimit from "../../Hooks/useUserConvertLimit";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const QRCodeGenerator = () => {
  const [inputText, setInputText] = useState("");
  const axiosPublic = useAxiosPublic();
  const {
    currentUserConvertLimit,
    matchPaidStatus,
    updateValue,
    reload,
    user,
  } = useUserConvertLimit();

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleDownloadQRCode = () => {
    if (currentUserConvertLimit > 0 || matchPaidStatus) {
      // Create a temporary canvas element to generate QR code image
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const qrCodeDataURL = document
        .querySelector("canvas")
        .toDataURL("image/png");

      // Create a temporary link element to trigger download
      const link = document.createElement("a");
      link.href = qrCodeDataURL;
      link.download = "qrcode.png";

      // Trigger the download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

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
    <div className="pt-28 text-AllTitle min-h-screen flex items-center justify-center border-dashed">
      <div className=" p-8 gap-4 rounded shadow-xl max-w-md w-full mx-auto bg-AllCard  ">
        {/* ----------input------- */}
        <h1 className="font-bold text-2xl">Create Qrcode and Download</h1>
        <div className="mt-4">
          <label htmlFor="text" className="block text-sm font-medium ">
            {" "}
            Input Text:
          </label>
          <input
            type="text"
            value={inputText}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full bg-transparent border rounded-md"
          />
        </div>

        <div className="mt-5">
          <QRCode className="w-full" value={inputText} />
        </div>

        <div className="mt-4 ">
          <Button onClick={handleDownloadQRCode}>
            Download QR Code
            <svg
              className="-mr-1 ml-2 h-4 w-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;
