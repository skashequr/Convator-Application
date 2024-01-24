import { CgProfile } from "react-icons/cg";
import { IoPersonAddSharp,IoAddCircleOutline } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";
const SideBar = () => {
    return (
        <div >
            <div className="flex justify-between bg-slate-300 rounded-full">
            <CgProfile className="w-9 h-8 m-6"/>
            <div className="flex justify-between">
            <IoPersonAddSharp className="w-9 h-8 m-6"></IoPersonAddSharp>
            <FaUserFriends className="w-9 h-8 m-6"></FaUserFriends>
            <IoAddCircleOutline className="w-9 h-8 m-6"></IoAddCircleOutline>
            </div>
            </div>
        </div>
    );
};

export default SideBar;