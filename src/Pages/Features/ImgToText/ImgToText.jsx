import { useState } from "react";
import Tesseract from "tesseract.js";
import Loader from "./Loader";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import Copy from "./Coppy";
import toast from "react-hot-toast";
import Dropzone from "react-dropzone";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useUserConvertLimit from "../../../Hooks/useUserConvertLimit";
import { Button, Card } from "flowbite-react";

function ImgToText() {
  const [image, setImage] = useState(null);
  const [text, setText] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState("eng");
  const axiosPublic = useAxiosPublic();
  const {
    currentUserConvertLimit,
    matchPaidStatus,
    updateValue,
    reload,
    user,
  } = useUserConvertLimit();

  // const handleChange = (files) => {
  //   setIsLoading(true);
  //   setImage(files[0]);
  //   setIsLoading(false);
  // };

  const deleteImage = () => {
    setIsLoading(true);
    setImage(null);
    setIsLoading(false);
  };

  const handleClick = () => {
    if (currentUserConvertLimit > 0 || matchPaidStatus) {
      if (!image) {
        toast.error("Please upload the image!");
        return;
      }

      setIsLoading(true);
      Tesseract.recognize(image, language, {
        logger: (m) => {
          setProgress(parseInt(m.progress * 100));
        },
      })
        .catch((err) => {
          console.error(err);
        })
        .then((result) => {
          let text = result.data.text;
          setText(text);
          setIsLoading(false);
        });

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

  const handleUpload = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setIsLoading(true);

    const url = "https://api.escuelajs.co/api/v1/files/upload";
    const formData = new FormData();
    formData.append("file", file);

    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          setImage(URL.createObjectURL(file));
          setIsLoading(false);
        } else {
          console.error(response);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="pt-28 rounded-lg shadow-2xl">
      <Card className="text-AllTitle bg-AllCard py-24 flex flex-col ">
        <header>
          <h1 className="text-center pt-32 text-5xl text-titleColor font-extrabold">
            Image to Text Converter
          </h1>
        </header>
        <div className="flex flex-col justify-center items-center my-4">
          <div className="flex gap-4 my-4">
            <p>Click the button for Change the language</p>
            <button
              onClick={() => setLanguage(language === "eng" ? "ben" : "eng")}
              className="bg-btnBgColor  dark:hover:bg-[#E94BFE] text-nowrap text-white text-sm rounded-full px-5 py-2 "
            >
              {language === "eng" ? "English" : "Bangla"}
            </button>
          </div>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {!image ? (
                <>
                  <label className="label">
                    {/* <div className="file-inner-container">
                    <MdCloudUpload className="upload-icon" />
                    <p className="upload-text">Click here to upload</p>
                  </div> */}
                    {/* <input
                    type="file"
                    name="uploadimage"
                    onChange={(e) => handleChange(e.target.files)}
                    className="upload"
                  /> */}

                    <div className="w-fit">
                      <Dropzone
                        onDrop={handleUpload}
                        accept="image/*"
                        minSize={1024}
                        maxSize={3072000}
                      >
                        {({ getRootProps, getInputProps }) => (
                          <div {...getRootProps({ className: "dropzone" })}>
                            <input {...getInputProps()} />
                            <img
                              className="w-64"
                              src="https://cdn.dribbble.com/users/527271/screenshots/6090255/media/c8f4598d29e31001516bc06721fe4f49.gif"
                              alt=""
                            />
                          </div>
                        )}
                      </Dropzone>
                    </div>
                  </label>
                </>
              ) : (
                <div className="flex flex-col mt-3 justify-center items-center my-5">
                  <img
                    src={image}
                    alt="uploaded"
                    className="uploaded-image w-94 h-64"
                  />
                  <MdDelete
                    className="delete-icon w-10 h-10 bg-red-500 hover:bg-yellow-400 rounded-2xl"
                    onClick={deleteImage}
                  />
                </div>
              )}
            </>
          )}
          {image && (
            <button
              onClick={handleClick}
              className="bg-btnBgColor  dark:hover:bg-[#E94BFE] text-nowrap text-white mt-3 mb-3 text-sm rounded-full px-5 py-2 "
            >
              Convert to text
            </button>
          )}

          {progress < 100 && progress > 0 && (
            <div>
              <div className="progress-label">Progress ({progress}%)</div>
              <div className="progress-bar">
                <div
                  className="progress"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}
          {text && (
            <Button>
              <Copy text={text} />
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}

export default ImgToText;
