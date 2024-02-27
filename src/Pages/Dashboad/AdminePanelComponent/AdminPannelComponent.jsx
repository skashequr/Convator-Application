import axios from "axios";
import { Avatar, Badge, Button, Popover, Table } from "keep-react";
import {
  ArrowsDownUp,
  Crown,
  Cube,
  DotsThreeOutline,
  Pencil,
  Trash,
} from "phosphor-react";
import { useEffect, useState } from "react";

export const AdminePannelTableComponent = () => {
  //
  const [admineUsers, setAdmineUsers] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          "https://file-convator-backend.vercel.app/user/findAdmine"
        );
        // handle success
        console.log(response.data);
        setAdmineUsers(response.data);
      } catch (error) {
        // handle error
        console.log(error);
      }
    })();
  }, []);
  console.log(admineUsers);
  return (
    <Table showCheckbox={true}>
      <Table.Caption>
        <div className="my-5 flex items-center justify-between px-6">
          <div className="flex items-center gap-5">
            <p className="text-body-1 font-semibold text-metal-600">
              Cash Out Transactions
            </p>
          </div>
          <div className="flex items-center gap-5">
            <Button type="outlineGray" size="sm">
              <span className="pr-2">
                <Cube size={24} />
              </span>
              New member
            </Button>
            <Button type="outlineGray" size="sm">
              <span className="pr-2">
                <Cube size={24} />
              </span>
              Search
            </Button>
          </div>
        </div>
      </Table.Caption>
      <Table.Head>
        <Table.HeadCell className="min-w-[290px]">
          <p className="text-body-6 font-medium text-metal-400">Type</p>
        </Table.HeadCell>
        <Table.HeadCell
          className="min-w-[183px]"
          icon={<ArrowsDownUp size={14} color="#8897AE" />}
        >
          Date
        </Table.HeadCell>
        <Table.HeadCell
          className="min-w-[160px]"
          icon={<ArrowsDownUp size={14} color="#8897AE" />}
        >
          Amount
        </Table.HeadCell>
        <Table.HeadCell
          className="min-w-[150px]"
          icon={<ArrowsDownUp size={14} color="#8897AE" />}
        >
          Status
        </Table.HeadCell>
        <Table.HeadCell
          className="min-w-[183px]"
          icon={<ArrowsDownUp size={14} color="#8897AE" />}
        >
          Received Date
        </Table.HeadCell>
        <Table.HeadCell className="min-w-[100px]" />
      </Table.Head>
      <Table.Body className="divide-gray-25 divide-y">
        {admineUsers ? (
          <Table.Row className="bg-white">
            <Table.Cell>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Avatar
                      shape="circle"
                      img="/images/company/paypal.png"
                      size="md"
                    />
                    <div>
                      <p className="-mb-0.5 text-body-4 font-medium text-metal-600">
                        {admineUsers?.name}
                      </p>
                      <span className="text-body-6 font-normal text-metal-500">
                        {admineUsers?.name?.replace(/\d+/g, "")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Table.Cell>
            <Table.Cell>
              <p className="text-body-5 font-medium text-metal-500">
                Jan 19, 2022
              </p>
              <p className="text-body-6 font-normal text-metal-500">3:45 pm</p>
            </Table.Cell>
            <Table.Cell>
              <p className="text-body-5 font-medium text-metal-500">$652.00</p>
            </Table.Cell>
            <Table.Cell>
              <div className="inline-block">
                <Badge
                  colorType="light"
                  color="success"
                  icon={<Crown size={18} weight="light" />}
                  iconPosition="left"
                >
                  {admineUsers.isAdmin ? "Admine" : "User"}
                </Badge>
              </div>
            </Table.Cell>
            <Table.Cell>
              <p className="text-body-5 font-medium text-metal-500">
                Jan 19, 2022
              </p>
              <p className="text-body-6 font-normal text-metal-500">3:45 pm</p>
            </Table.Cell>
            <Table.Cell>
              <Popover
                showDismissIcon={false}
                showArrow={false}
                className="w-52 border border-metal-100 p-2"
              >
                <Popover.Container className="!mt-0 !block">
                  <ul>
                    <li className="rounded px-2 py-1 hover:bg-metal-100">
                      <button className="flex w-full items-center justify-between text-body-4 font-normal text-metal-600">
                        <span>Delete</span>
                        <span>
                          <Trash />
                        </span>
                      </button>
                    </li>
                    <li className="rounded px-2 py-1 hover:bg-metal-100">
                      <button className="flex w-full items-center justify-between text-body-4 font-normal text-metal-600">
                        <span>Edit</span>
                        <span>
                          <Pencil />
                        </span>
                      </button>
                    </li>
                  </ul>
                </Popover.Container>
                <Popover.Action>
                  <Button type="outlineGray" size="xs" circle={true}>
                    <DotsThreeOutline size={14} color="#5E718D" weight="bold" />
                  </Button>
                </Popover.Action>
              </Popover>
            </Table.Cell>
          </Table.Row>
        ) : (
          " "
        )}
      </Table.Body>
    </Table>
  );
};
