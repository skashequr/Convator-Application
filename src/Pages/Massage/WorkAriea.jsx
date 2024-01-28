import { MdDelete } from "react-icons/md";
import ChatComponent from "./ChatBabbule";
import { useState } from "react";
import SideBar from "./SideBar";
const WorkAriea = () => {
  
  return (
    <div>
      
      <SideBar></SideBar>
      
      <hr />
      <ChatComponent></ChatComponent>
    </div>
  );
};

export default WorkAriea;


// Assuming req.body contains the necessary data (content, chatId)

