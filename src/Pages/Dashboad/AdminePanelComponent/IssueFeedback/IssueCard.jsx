import { User } from "phosphor-react";
import { Button, Card } from "keep-react";
import { Progress } from "flowbite-react";
import {
  DateRange,
  Email,
  PhoneEnabled,
  PriorityHighOutlined,
} from "@mui/icons-material";
import Swal from "sweetalert2";

import useFeedback from "../../../../Hooks/useFeedback";

const IssueCard = ({ issue }) => {
  const AxiosIssuFeedbck = useFeedback();
  const {
    name,
    emailAddress,
    phoneConfirmation,
    fileUpload,
    textarea,
    date,
    range,
    priority,
  } = issue;

  // --------------delete-----------------
  const handleDeleteItem = async (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await AxiosIssuFeedbck.delete(`/task/${item._id}`);
          if (res.data.deletedCount > 0) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${issue.name} has been deleted`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        } catch (error) {
          console.error("Error deleting item:", error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong while deleting the item!",
          });
        }
      }
    });
  };
  console.log(issue);
  return (
    <div className="shadow-2xl w-full">
      <Card
        className="!max-w-xs w-full overflow-hidden rounded-md md:!max-w-[478px]"
        imgSrc={fileUpload}
        imgSize="md"
        horizontal={true}
      >
        <Card.Container className="space-y-4 p-6">
          <Card.Title className="flex items-center gap-2 text-body-5 font-medium text-metal-500 md:!text-body-4">
            <User size={20} color="#5E718D" />
            <span className="tex-2xl">Name:-{name}</span>
          </Card.Title>
          {/* -------email---------- */}
          <Card.Container className="flex items-center justify-between">
            <Card.Title className="flex items-center gap-2 !text-body-5 font-medium text-metal-500">
              <Email size={20} color="#5E718D" />
              <span>{emailAddress}</span>
            </Card.Title>
          </Card.Container>
          {/* --------------text-area--------- */}
          <Card.Container className="flex items-center ">
            <Card.Title className="flex  text-body-5 font-medium ">
              <span className="text-pink-400">{textarea}</span>
            </Card.Title>
          </Card.Container>
          <Card.Container className="flex items-center justify-between">
            {/*-------------- priroty--------- */}
            <Card.Title className="flex items-center gap-2 !text-body-5 font-medium text-metal-500">
              <PriorityHighOutlined size={16} color="#5E718D" />
              <span className="">{priority}</span>
            </Card.Title>
            {/* ----date--- */}
            <Card.Title className="flex items-center gap-2 !text-body-5 font-medium text-metal-500">
              <DateRange size={16} color="#5E718D" />
              <span className="">{date}</span>
            </Card.Title>
          </Card.Container>

          {/* /------------------- */}

          <Card.Container className="flex items-center gap-3 justify-between">
            {/*-------------- phone--------- */}
            <Card.Title className="flex items-center gap-2 !text-body-5 font-medium text-metal-500">
              <PhoneEnabled></PhoneEnabled>
              <span className="">{phoneConfirmation}</span>
            </Card.Title>
          </Card.Container>

          {/* ---- range--------- */}
          <Card.Container className="items-center  justify-between">
            {/* ---- range--- */}
            <Card.Title className=" ">
              <Progress
                progress={range}
                size="lg"
                color="indigo"
                progressLabelPosition="inside"
                textLabel="Flowbite"
                textLabelPosition="outside"
                labelProgress
              />
            </Card.Title>
          </Card.Container>

          {/* btton-------- */}
          <Card.Container className="my-3 flex items-center justify-between">
            <Button type="primary" size="sm">
              Edit
            </Button>
            <Button onClick={handleDeleteItem} type="primary" size="sm">
              Delete
            </Button>
          </Card.Container>
        </Card.Container>
      </Card>
    </div>
  );
};

export default IssueCard;
