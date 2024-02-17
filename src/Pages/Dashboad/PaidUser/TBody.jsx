import React, { useEffect, useState } from "react";
import { Avatar, Button, Modal, CheckBox } from "keep-react";
import { CloudArrowUp, UserPlus } from "phosphor-react";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
const TBody = ({ info, index, reload }) => {
  const axiosPublic = useAxiosPublic();
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showAccessModal, setShowAccessModal] = useState(false);
  const [data, setModalData] = useState(null);
  const [leftTime, setLeftTime] = useState("");
  const [userDelete, setUserDelete] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const {
    _id,
    cus_name,
    cus_email,
    cus_address,
    cus_phone,
    plan,
    price,
    access_limit,
    plan_id,
    pay_time,
    tran_id,
    paidStatus,
    access_limit_day,
  } = info;
  // console.log("pay_time", pay_time);
  // Define the given date
  // Input date string
  const inputDateStr = pay_time;

  // Split the input date string into date and time parts
  const parts = inputDateStr.split(", ");
  const datePart = parts[0];
  const timePart = parts[1];

  // Split the date part into month, day, and year
  const dateParts = datePart.split("/");
  const month = dateParts[0];
  const day = dateParts[1];
  const year = dateParts[2];

  // Convert 24-hour format to ISO 8601 format
  const isoTime = timePart.replace("24:", "00:");

  // Construct the ISO 8601 formatted date string
  const isoDateString = `${year}-${month}-${day}T${isoTime}`;

  // console.log("isoDateString", isoDateString); // Output: "2024-02-18T00:00:03"

  const givenDate = new Date(isoDateString);
  // console.log(givenDate);

  useEffect(() => {
    function logTimeLeft() {
      // Calculate the expiration date (two days from the given date)
      const expirationDate = new Date(givenDate);
      expirationDate.setDate(givenDate.getDate() + access_limit_day); // Adding 2 days and fixing the date setting
      // expirationDate.setHours(23, 59, 59); // Setting time to end of day
      // console.log("givenDate, expirationDate", givenDate, expirationDate);

      // Get the current time in milliseconds
      const currentTime = Date.now();

      // Calculate the difference in milliseconds
      const difference = expirationDate.getTime() - currentTime;

      // Check if the expiration date has passed
      if (difference <= 0) {
        console.log("The user should be Removed");
        // Perform your removal logic here, e.g., displaying an alert
        axiosPublic
          .put("/payment", { id })
          .then((response) => {
            // console.log("User has been removed", response);
            setShowAccessModal(!showAccessModal);
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "The user has been removed",
              showConfirmButton: false,
              timer: 1500,
            });
            reload();
          })
          .catch((error) => {
            console.error("Error removing user:", error);
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: "Failed to remove user",
              showConfirmButton: false,
              timer: 1500,
            });
          });
        // Clear the interval if the expiration date has passed
        // clearInterval(intervalId);
        return;
      }

      // Convert milliseconds to hours, minutes, and seconds
      const hoursLeft = Math.floor(difference / (1000 * 60 * 60));
      const minutesLeft = Math.floor(
        (difference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const secondsLeft = Math.floor((difference % (1000 * 60)) / 1000);

      // Update the state with the remaining time
      setLeftTime(`${hoursLeft}h : ${minutesLeft}m: ${secondsLeft}s`);
    }

    // Log the initial time left
    logTimeLeft();

    // Update the remaining time every second
    const intervalId = setInterval(logTimeLeft, 1000);

    // Clean up function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const onClickHistoryModal = () => {
    setShowHistoryModal(!showHistoryModal);
  };
  const onClickAccessModal = (data) => {
    setModalData(data);
    setShowAccessModal(!showAccessModal);
  };

  const handleChecked = (value) => {
    setUserDelete(!userDelete);
  };

  const handleUserDelete = (id) => {
    // console.log("User removed", id);
    // Assuming axiosPublic is your instance of Axios
    axiosPublic
      .put("/payment", { id })
      .then((response) => {
        // console.log("User has been removed", response);
        setShowAccessModal(!showAccessModal);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "The user has been removed",
          showConfirmButton: false,
          timer: 1500,
        });
        reload();
      })
      .catch((error) => {
        console.error("Error removing user:", error);
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Failed to remove user",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  return (
    <>
      <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
        <tr onClick={() => onClickAccessModal(info)}>
          <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
            <div className="inline-flex items-center gap-x-3">
              <input
                type="checkbox"
                className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700"
              />

              <span>{index + 1}</span>
            </div>
          </td>
          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
            {pay_time}
          </td>
          <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
            <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 dark:bg-gray-800">
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" />
              </svg>

              <h2 className="text-sm font-normal">{plan}</h2>
            </div>
          </td>
          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
            <div className="flex items-center gap-x-2">
              <img
                className="object-cover w-8 h-8 rounded-full"
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                alt=""
              />
              <div>
                <h2 className="text-sm font-medium text-gray-800 dark:text-white ">
                  {cus_name}
                </h2>
                <p className="text-xs font-normal text-gray-600 dark:text-gray-400">
                  {cus_email}
                </p>
              </div>
            </div>
          </td>
          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
            {tran_id}
          </td>
          <td className="px-4 py-4 text-sm whitespace-nowrap">
            <div className="flex items-center gap-x-6">
              <button className="text-gray-500 transition-colors duration-200 dark:hover:text-indigo-500 dark:text-gray-300 hover:text-indigo-500 focus:outline-none">
                Archive
              </button>

              <button className="text-blue-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none">
                Download
              </button>
            </div>
          </td>
        </tr>
      </tbody>
      <>
        <Modal
          icon={<CloudArrowUp size={28} color="#1B4DFF" />}
          size="md"
          show={showHistoryModal}
          // onClick={onClickAccessModal}
        >
          <Modal.Body>
            <div className="space-y-6"></div>
            <div className="mt-5 flex items-center">
              <CheckBox
                size="md"
                variant="square"
                id="11"
                name="countries"
                color="info"
                handleChecked={handleChecked}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="outlineGray"
              width="half"
              onClick={onClickHistoryModal}
            >
              Cancel
            </Button>
            <Button type="primary" width="half" onClick={onClickHistoryModal}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal
          icon={<UserPlus size={28} color="#5E718D" />}
          size="lg"
          show={showAccessModal}
        >
          <Modal.Body>
            <div className="space-y-6">
              <div className="bg-gray-200 font-sans w-full flex flex-row justify-center items-center">
                <div className="card w-96 mx-auto bg-white  shadow-xl hover:shadow">
                  <img
                    className="w-32 mx-auto rounded-full -mt-20 border-8 border-white"
                    src="https://avatars.githubusercontent.com/u/67946056?v=4"
                    alt=""
                  />
                  <div className="text-center mt-2 text-3xl font-medium">
                    {cus_name}
                  </div>
                  <div className="text-center mt-2 font-light text-sm">
                    {cus_email}
                  </div>
                  <div className="text-center font-normal text-lg">
                    {cus_phone}
                  </div>
                  <div className="px-6 text-center mt-2 font-light text-sm">
                    <p>{cus_address}</p>
                    <p>{pay_time}</p>
                  </div>
                  <hr className="mt-8" />
                  <div className="flex flex-col justify-center items-center ">
                    <div className="flex text-center">
                      <span className="font-bold w-full ">
                        {leftTime}
                        Left Time
                      </span>{" "}
                    </div>
                    <div className="w-0 border border-gray-300"></div>
                    <div className="w-1/2 text-center">
                      <span className="font-bold">{plan}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:mb-6 mb-4 flex items-center gap-2">
                <Avatar
                  shape="circle"
                  img="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                  statusPosition="bottom-right"
                  size="md"
                />
                <div>
                  <p className="text-body-5 font-semibold text-gray-500">
                    {data?.cus_name}
                  </p>
                  <p className="text-body-6 text-gray-500">{data?.cus_email}</p>
                </div>
              </div>
            </div>
            <div className="mt-5 flex items-center">
              <CheckBox
                size="md"
                variant="square"
                id="12"
                name="countries"
                color="info"
                handleChecked={handleChecked}
              />
              <label
                htmlFor="12"
                className="ml-2 text-body-4 font-medium text-metal-500"
              >
                Remove the User
              </label>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button type="outlineGray" onClick={onClickAccessModal}>
              Cancel
            </Button>
            <Button
              type="primary"
              onClick={() => handleUserDelete(_id)}
              disabled={!userDelete && disabled}
            >
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </>
  );
};

export default TBody;
