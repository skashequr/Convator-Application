import { Skeleton } from "keep-react";
import { useEffect, useState } from "react";
import { Pagination } from "keep-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
const DashUsers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [defultUser, setDefultUser] = useState(6);
  const {
    data: DashallUsers,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/user/fetchUsers"
        );
        return response.data;
      } catch (error) {
        throw new Error("Error fetching data");
      }
    },
  });
  const [users, setData] = useState("");
  useEffect(() => {
    fetch(
      `http://localhost:5000/user/pagginate?page=${currentPage}&pageSize=${defultUser}`
    )
      .then((response) => response.json())
      .then((data) => setData(data));
  }, [currentPage, defultUser]);
  console.log(users);
  const { data, totalPages } = users;

  const handleRoleChange = (event) => {
    console.log("Selected Value:", event.target.value);
    setDefultUser(event.target.value);
    console.log(event.target.value);
  };

  const deleteUser = async (id) => {
    console.log(id);
    try {
      const response = await axios.delete(
        `http://localhost:5000/user/delateUser/${id}`
      );
      console.log(response.data.message); // Data deleted successfully
      //   Update your UI accordingly (e.g., remove the deleted item from the list)
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };
  if (isLoading)
    return (
      <div className="max-w-xl py-36 flex justify-center items-center mx-auto">
        <Skeleton animation={true}>
          <div className="w-11/12">
            <Skeleton.Line height="h-6" />
          </div>
          <div className="w-9/12">
            <Skeleton.Line height="h-4" />
          </div>
          <div className="w-10/12">
            <Skeleton.Line height="h-4" />
          </div>
          <div className="w-7/12">
            <Skeleton.Line height="h-4" />
          </div>
        </Skeleton>
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg   px-10">
        <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900">
          <div>
            <div className="flex m-6 gap-4 justify-center items-center">
              <select
                className="text-white p-3 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                value={defultUser}
                onChange={handleRoleChange}
              >
                <option value="6">6 User</option>
                <option value="10">10 User</option>
                <option value="15">15 User</option>
                <option value="30">30 User</option>
              </select>
            </div>
          </div>
          <label className="sr-only">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="table-search-users"
              className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for users"
            />
          </div>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label className="sr-only">checkbox</label>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Position
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((user, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="w-4 p-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-table-search-2"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label className="sr-only">checkbox</label>
                  </div>
                </td>
                <th
                  scope="row"
                  className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <img
                    className="w-10 h-10 rounded-full"
                    src="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"
                    alt="Jese image"
                  />
                  <div className="ps-3">
                    <div className="text-base font-semibold">{user.name}</div>
                    <div className="font-normal text-gray-500">
                      {user.email}
                    </div>
                  </div>
                </th>
                <td className="px-6 py-4">
                  <Link to={`massage/shearefile/${user._id}`}>
                    <button>Share File</button>
                  </Link>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>{" "}
                    Online
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => deleteUser(user?._id)}
                    type="button"
                    data-modal-show="editUserModal"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Delete User
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className=" my-8 flex items-center justify-center">
        <Pagination
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          totalPages={totalPages}
          iconWithText={true}
          prevNextShape="circle"
          activeCurrentPageShape="circle"
        />
      </div>
    </div>
  );
};

export default DashUsers;
