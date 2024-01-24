import SideBar from "./SideBar";

const Massage = () => {
    return (
        <div>
            <div className="grid grid-col-12 bg-warning-100 h-full w-full">
                <div className="col-span-1 h-96 bg-slate-100">
                    <SideBar></SideBar>
                </div>
                <div className="col-span-12 bg-red-950">

                </div>
            </div>
        </div>
    );
};

export default Massage;