import axios from "axios";
import { useEffect, useState } from "react";
import { Avatar,Button,Modal,CheckBox } from "keep-react";
import { CloudArrowUp, UserPlus } from "phosphor-react";
const PaidUser = () => {
    const [showHistoryModal, setShowHistoryModal] = useState(false);
    const [showAccessModal, setShowAccessModal] = useState(false);
    const [data , setModalData] = useState(null);
    const onClickHistoryModal = () => {
      setShowHistoryModal(!showHistoryModal);
    };
    const onClickAccessModal = (data) => {
        setModalData(data);
      setShowAccessModal(!showAccessModal);
    };
  
    const handleChecked = (value) => {
      //value
    };
    const [pamentInfo , setPamentInfo] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:5000/payment").then((response) => {
            setPamentInfo(response.data);
        });
      }, []);
    console.log(pamentInfo);
    console.log("sjgikjnmgw");
    return (
      <div>
<section className="container px-4 mx-auto">
    <div className="flex flex-col">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                            <tr>
                                <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <div className="flex items-center gap-x-3">
                                        <input type="checkbox" className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700"/>
                                        <button className="flex items-center gap-x-2">
                                            <span>Invoice</span>

                                            <svg className="h-3" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z" fill="currentColor" stroke="currentColor" />
                                                <path d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z" fill="currentColor" stroke="currentColor"  />
                                                <path d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z" fill="currentColor" stroke="currentColor" />
                                            </svg>
                                        </button>
                                    </div>
                                </th>

                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    Date
                                </th>

                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    Status
                                </th>

                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    Customer
                                </th>

                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    Purchase
                                </th>

                                <th scope="col" className="relative py-3.5 px-4">
                                    <span className="sr-only">Actions</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                            { pamentInfo?.map((info, index) => 
                            <tr key={index}>
                                <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                    <div className="inline-flex items-center gap-x-3">
                                        <input type="checkbox" className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700"/>

                                        <span>{index+1}</span>
                                    </div>
                                </td>
                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">Jan 6, 2022</td>
                                <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                    <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 dark:bg-gray-800">
                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10 3L4.5 8.5L2 6" stroke="currentColor"/>
                                        </svg>

                                        <h2 className="text-sm font-normal">{info?.plan}</h2>
                                    </div>
                                </td>
                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                    <div className="flex items-center gap-x-2" onClick={() => onClickAccessModal(info)} >
                                        <img className="object-cover w-8 h-8 rounded-full" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt=""/>
                                        <div>
                                            <h2 className="text-sm font-medium text-gray-800 dark:text-white ">{info?.cus_name}</h2>
                                            <p className="text-xs font-normal text-gray-600 dark:text-gray-400">{info?.cus_email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{info?.tran_id}</td>
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
                            </tr> ) 
                            }
                          
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <>
     
      
      <Modal
        icon={<CloudArrowUp size={28} color="#1B4DFF" />}
        size="md"
        show={showHistoryModal}
        // onClick={onClickAccessModal}
      >
        <Modal.Body>
          <div className="space-y-6">
           
          </div>
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
          <Button type="outlineGray" width="half" onClick={onClickHistoryModal}>
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
     <img className="w-32 mx-auto rounded-full -mt-20 border-8 border-white" src="https://avatars.githubusercontent.com/u/67946056?v=4" alt=""/>
     <div className="text-center mt-2 text-3xl font-medium">Ajo Alex</div>
     <div className="text-center mt-2 font-light text-sm">@devpenzil</div>
     <div className="text-center font-normal text-lg">Kerala</div>
     <div className="px-6 text-center mt-2 font-light text-sm">
       <p>
         Front end Developer, avid reader. Love to take a long walk, swim
       </p>
     </div>
     <hr className="mt-8"/>
     <div className="flex p-4">
       <div className="w-1/2 text-center">
         <span className="font-bold">1.8 k</span> Followers
       </div>
       <div className="w-0 border border-gray-300">
         
       </div>
       <div className="w-1/2 text-center">
         <span className="font-bold">2.0 k</span> Following
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
              Save on this browser
            </label>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button type="outlineGray" onClick={onClickAccessModal}>
            Cancel
          </Button>
          <Button type="primary" onClick={onClickAccessModal}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
</section>

      </div>
    );
  };
  
  export default PaidUser;
  