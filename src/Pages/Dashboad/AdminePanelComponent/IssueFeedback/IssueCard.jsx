import { User } from "phosphor-react";
import { Button, Card } from "keep-react";
import {
  DateRange,
  Email,
  PhoneEnabled,
  PriorityHighOutlined,
  RamenDining,
} from "@mui/icons-material";

const IssueCard = ({ issue }) => {
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

  console.log(issue);
  return (
    <div className="shadow-2xl">
      <Card
        className="!max-w-xs overflow-hidden rounded-md md:!max-w-[478px]"
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

          <Card.Container className="flex items-center justify-between">
            {/*-------------- phone--------- */}
            <Card.Title className="flex items-center gap-2 !text-body-5 font-medium text-metal-500">
              <PhoneEnabled></PhoneEnabled>
              <span className="">{phoneConfirmation}</span>
            </Card.Title>
            {/* ---- range--- */}
            <Card.Title className="flex items-center gap-2 !text-body-5 font-medium text-metal-500">
              <RamenDining size={16} color="#5E718D" />
              <span>{range} %</span>
            </Card.Title>
          </Card.Container>

          <Card.Container className="my-3 flex items-center justify-between">
            <Button type="primary" size="sm">
              Edit
            </Button>
            <Button type="primary" size="sm">
              Delete
            </Button>
          </Card.Container>
        </Card.Container>
      </Card>
    </div>
  );
};

export default IssueCard;
