import SideBar from "./SideBar";
import WorkAriea from "./WorkAriea";

const Massage = () => {
    return (
        <div className="grid grid-cols-12">
            <div className="bg-slate-300 col-span-4">
            <SideBar></SideBar>
            </div>
            <div className=" col-span-8">
                <WorkAriea></WorkAriea>
            </div>
            
          </div>
    );
};

export default Massage;


{/* <div className="col-span-3 h-96 bg-slate-100">
                    <SideBar></SideBar>
                </div>
                <div className="col-span-4 bg-red-950">
                    <WorkAriea></WorkAriea>
                </div> */}