import { useRef, useState } from "react";
import { Card, Checkbox, FileInput, Label, Modal } from "flowbite-react";
import axios from "axios";
import Swal from "sweetalert2";
import useFeedback from "../Hooks/useFeedback";
import useUserConvertLimit from "../Hooks/useUserConvertLimit";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
function ImageResizeTool() {
  const [previewImage, setPreviewImage] = useState("");
  const [originalImageRatio, setOriginalImageRatio] = useState(0);
  const axiosPublic = useAxiosPublic();
  const {
    currentUserConvertLimit,
    matchPaidStatus,
    updateValue,
    reload,
    user,
  } = useUserConvertLimit();

  const fileInputRef = useRef(null);
  const widthInputRef = useRef(null);
  const heightInputRef = useRef(null);
  const ratioInputRef = useRef(null);
  const qualityInputRef = useRef(null);

  // ---------------modal-----------

  const [openModal, setOpenModal] = useState(false);
  const [email, setEmail] = useState("");

  function onCloseModal() {
    setOpenModal(false);
    setEmail("");
  }

  const axiosFeedback = useFeedback();
  const [formData, setFormData] = useState({
    emailAddress: "",
    name: "",
    phoneConfirmation: "",
    priority: "",
    range: "",
    date: "",
    textarea: "",
    imageUrl: "display_url",
  });
  // --------
  const loadFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function () {
      setPreviewImage(reader.result);
      const img = new Image();
      img.onload = function () {
        widthInputRef.current.value = img.naturalWidth;
        heightInputRef.current.value = img.naturalHeight;
        setOriginalImageRatio(img.naturalWidth / img.naturalHeight);
        document.querySelector(".wrapper").classList.add("active");
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  };

  const handleWidthChange = () => {
    const height = ratioInputRef.current.checked
      ? widthInputRef.current.value / originalImageRatio
      : heightInputRef.current.value;
    heightInputRef.current.value = Math.floor(height);
  };

  const handleHeightChange = () => {
    const width = ratioInputRef.current.checked
      ? heightInputRef.current.value * originalImageRatio
      : widthInputRef.current.value;
    widthInputRef.current.value = Math.floor(width);
  };

  // -------------download-------------
  const resizeAndDownload = async () => {
    if (currentUserConvertLimit > 0 || matchPaidStatus) {
      const canvas = document.createElement("canvas");
      const a = document.createElement("a");
      const ctx = canvas.getContext("2d");

      const imgQuality = qualityInputRef.current.checked ? 0.5 : 1.0;

      canvas.width = widthInputRef.current.value;
      canvas.height = heightInputRef.current.value;

      const img = new Image();
      img.onload = function () {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        a.href = canvas.toDataURL("image/jpeg", imgQuality);
        a.download = new Date().getTime().toString();
        a.click();
      };
      img.src = previewImage;

      // Increment download count
      try {
        await axios.post("http://localhost:5000/api/download");
      } catch (error) {
        console.error("Error incrementing download count:", error);
      }

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

  // --------------feedback---------
  // const handleInputChange = (e) => {

  //   const { id, value } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [id]: value,
  //   }));
  // };

  const handleInputChange = async (e) => {
    const { id, value, files } = e.target;

    // Check if the input is a file input and if a file has been selected
    if (id === "fileUpload" && files.length > 0) {
      const file = files[0];

      // Create a FormData object to send the file to the ImgBB API
      const formData = new FormData();
      formData.append("image", file);
      formData.append("key", image_hosting_key);

      try {
        // Make a POST request to the ImgBB API to upload the image
        const response = await axios.post(image_hosting_api, formData);

        // Extract the image URL from the response
        const imageUrl = response.data.data.url;

        // Update the formData state with the image URL
        setFormData((prevData) => ({
          ...prevData,
          [id]: imageUrl,
        }));

        // You can also set the previewImage state to display the uploaded image
        setPreviewImage(imageUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    } else {
      // For other input fields, update the formData state as usual
      setFormData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosFeedback.post("/task", formData);

      if (response.status === 200) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Upload successful",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: '<a href="#">Why do I have this issue?</a>',
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="p-32 gap-4 w-full grid  items-center justify-center mx-auto  ">
      <Card className="wrapper">
        {/* ---------------file upload-------------- */}
        <div className=" w-full items-center upload-box justify-center">
          <Label
            htmlFor="dropzone-file"
            className="dark:hover:bg-bray-800 flex  w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
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
              <p>Upload Image</p>
            </div>
            <FileInput
              type="file"
              ref={fileInputRef}
              onChange={loadFile}
              id="dropzone-file"
              className="hidden"
            />{" "}
            <img className="w-96" src={previewImage} alt="" />
          </Label>
        </div>

        {/* ----------------input text data ------------------ */}
        <div className=" mt-8 grid grid-cols-2 gap-4 bg-gray-50  items-center justify-center">
          {/*----------------------------------------- width -----------------*/}
          <div className="flex flex-col">
            <label>Width:</label>

            <input
              type="number"
              ref={widthInputRef}
              onKeyUp={handleWidthChange}
              id="text"
              className="w-full max-w-lg rounded-lg border
               border-slate-200 px-2 py-1 hover:border-blue-500 focus:outline-none 
               focus:ring focus:ring-blue-500/40 active:ring active:ring-blue-500/40"
            />
          </div>
          {/* ---------height---------- */}
          <div className="flex flex-col">
            <label>Height:</label>

            <input
              type="number"
              ref={heightInputRef}
              onKeyUp={handleHeightChange}
              id="text"
              className="w-full max-w-lg rounded-lg border
               border-slate-200 px-2 py-1 hover:border-blue-500 focus:outline-none 
               focus:ring focus:ring-blue-500/40 active:ring active:ring-blue-500/40"
            />
          </div>
          {/* -----------lock-------- */}

          {/*  */}
          <div className="flex items-center gap-2">
            <Checkbox
              type="checkbox"
              ref={ratioInputRef}
              id="accept"
              defaultChecked
            />
            <Label htmlFor="accept" className="flex">
              Default Ratio&nbsp;
              <p className="text-cyan-600 hover:underline dark:text-cyan-500">
                Lock
              </p>
            </Label>
          </div>
          {/* -----quality------------- */}

          {/*  */}
          <div className="flex items-center gap-2">
            <Checkbox
              type="checkbox"
              ref={qualityInputRef}
              id="accept"
              defaultChecked
            />
            <Label htmlFor="accept" className="flex">
              Low-size&nbsp;
              <p className="text-cyan-600 hover:underline dark:text-cyan-500">
                Lock
              </p>
            </Label>
          </div>
          {/* ----------download------------- */}

          <div className="text-center justify-center mx-auto">
            <button
              onClick={resizeAndDownload}
              className="bg-[#5ab8ee] hover:bg-grey text-white font-bold py-2 px-4 rounded inline-flex items-center"
            >
              <svg
                className="w-4 h-4 mr-2 "
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
              </svg>
              <span>Download</span>
            </button>
          </div>
        </div>

        {/*------------------ Send Feedback Button------------------- */}
        <button
          onClick={() => setOpenModal(true)}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-4 inline-flex items-center"
        >
          <svg
            className="w-4 h-4 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              fill="currentColor"
              d="M10 0c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10-4.477-10-10-10zm-1.707 14.293c-.39.39-1.024.39-1.414 0l-3.293-3.293c-.39-.39-.39-1.024 0-1.414.39-.39 1.024-.39 1.414 0l2.586 2.586 6.293-6.293c.39-.39 1.024-.39 1.414 0 .39.39.39 1.024 0 1.414l-7 7z"
            />
          </svg>
          <span>Send Feedback</span>
        </button>

        {/* ----------------modal box----------- */}
      </Card>

      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="max-w-4xl p-6 mx-auto bg-indigo-600 rounded-md shadow-md dark:bg-gray-800 mt-20">
            <h1 className="text-xl font-bold text-white capitalize dark:text-white">
              Please Feedback here
            </h1>
            <form onSubmit={handleFormSubmit}>
              <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                <div>
                  <label className="text-white dark:text-gray-200">
                    Email Address
                  </label>
                  <input
                    id="emailAddress"
                    type="email"
                    placeholder="Email Address"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    value={formData.emailAddress}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="text-white dark:text-gray-200">Name</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Name"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="text-white dark:text-gray-200">
                    phoneNumber
                  </label>
                  <input
                    id="phoneConfirmation"
                    type="number"
                    placeholder="Phone Confirmation"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    value={formData.phoneConfirmation}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="text-white dark:text-gray-200">
                    priority
                  </label>
                  <select
                    id="priority"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    value={formData.priority}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Priority</option>
                    <option value="Low">Low</option>
                    <option value="Middle">Middle</option>
                    <option value="High">High</option>
                  </select>
                </div>

                <div>
                  <label className="text-white dark:text-gray-200">Range</label>
                  <input
                    id="range"
                    type="range"
                    className="block w-full py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    value={formData.range}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="text-white dark:text-gray-200">Date</label>
                  <input
                    id="date"
                    type="date"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    value={formData.date}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="text-white dark:text-gray-200">
                    Text Area
                  </label>
                  <textarea
                    id="textarea"
                    placeholder="Text Area"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    value={formData.textarea}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white">
                    Image upload
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-white"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600
                    hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2
                     focus-within:ring-indigo-500"
                        >
                          <span className="">image upload</span>
                          <input
                            id="fileUpload"
                            name="file-upload"
                            type="file"
                            accept="image/jpeg"
                            onChange={handleInputChange}
                          />
                        </label>
                      </div>
                      <p className="text-xs text-white">PNG, JPG,</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  type="submit"
                  className=" px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600"
                >
                  Upload
                </button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ImageResizeTool;
