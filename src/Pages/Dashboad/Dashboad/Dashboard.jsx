import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <div className="flex">
        <div className="w-64 min-h-screen text-2xl font-bold bg-[#1d061e]">
          <ul className="p-4">
            <li>route1</li>
            <li>router2</li>
            <li>router3</li>
            <li>router4</li>
          </ul>
        </div>

        {/*------------- dashboard content ------------------*/}
        <div className="flex-1 p-8">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
