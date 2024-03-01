import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../Authentication/AuthProvider/Authprovider";
import MassageSelf from "./MassgaeContent/MassageSelf";
import MassageOthers from "./MassgaeContent/MassageOthers";
import { IoCreateOutline } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import useMessage from "../../Hooks/useMessage";
const ChatBabbule = () => {
  const { singleUser, chat_id, setChat_id } = useContext(AuthContext);
  const singleuserId = singleUser?._id;
  const params = useParams();
  const userId = params?._id;
  const [userData, setUserData] = useState(null);
  const [chatMessage, reload, isLoading] = useMessage();
  // const [chatMessage, setAllMessages] = useState(null);
  const secUser = userData?.name; // jake ami massage pathabo tar nam
  const friUser = singleUser?.name; // je massage pathabe.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/user/userbyId?id=${userId}`
        );
        console.log(response.data); // This will log the response data to the console
        setUserData(response.data); // Set the response data to state
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [userId]);

  //Create chate

  useEffect(() => {
    axios
      .post("http://localhost:5000/chat/send", {
        userId,
        singleuserId,
        secUser,
        friUser,
      })
      .then((response) => {
        console.log("Chat created successfully:", response.data);
        setChat_id(response.data._id);
      })
      .catch((error) => {
        console.error("Error creating chat:", error);
        // Handle error state or show error message to the user
      });
  }, [friUser, secUser, singleuserId, userId, setChat_id]);

  //Send massage
  console.log(chat_id, userId);
  const sendMassage = (e) => {
    e.preventDefault();
    const massageContent = e.target.massage.value;
    console.log(massageContent);
    axios
      .post("http://localhost:5000/message", {
        content: massageContent,
        chatId: chat_id,
        data: [friUser, secUser],
      })
      .then(({ data }) => {
        console.log("Message Fired", data);
        reload();
      })
      .catch((error) => {
        console.error("error", error);
      });
  };

  // refetch();
  // console.log(fetchMessage);
  // useEffect(() => {
  //   console.log("Users refreshed");

  //   axios.get(`http://localhost:5000/message/${chat_id}`).then(({ data }) => {
  //     setAllMessages(data);
  //     console.log("Data from Acess Chat API ", data);
  //   });
  //   // scrollToBottom();
  // }, [chat_id]);

  // const { data: usermessage = [], refetch } = useQuery({
  //   queryKey: ["usersmessage", chat_id],
  //   queryFn: async () => {
  //     const res = await axios.get(`http://localhost:5000/message/${chat_id}`);
  //     setAllMessages(res.data);
  //     return res.data;
  //   },
  // });

  // console.log(usermessage);
  // const [x, setx] = useState(true);
  // console.log(allMessages);
  // useEffect(() => {
  //   refetch();
  // }, [refetch, x]);

  useEffect(() => {
    chatMessage?.forEach((item) => {
      // Check if the first element in the users array matches x

      if (item.chat.users[0] === singleUser?._id) {
        // If yes, display the content and determine position

        const index = chatMessage.indexOf(item);
        if (index === 0) {
          console.log("Position: Display to the right");
        } else {
          console.log("Position: Display to the left");
        }
      }
    });
  }, [chatMessage, singleUser]);

  return (
    <div>
      <div className="flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen ">
        {/* Headder */}
        <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200 pt-24">
          <div className="relative flex items-center space-x-4">
            <div className="relative">
              <span className="absolute text-green-500 right-0 bottom-0">
                <svg width="20" height="20">
                  <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
                </svg>
              </span>
              <img
                src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
                alt=""
                className="w-10 sm:w-16 h-10 sm:h-16 rounded-full"
              />
            </div>
            <div className="flex flex-col leading-tight">
              <div className="text-2xl mt-1 flex items-center">
                <span className="text-gray-700 mr-3">{secUser}</span>
              </div>
              <span className="text-lg text-gray-600">{userData?.email}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button // onClick={createChate}
              type="button"
              className="inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
            >
              <IoCreateOutline className="h-12 w-12"></IoCreateOutline>
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                ></path>
              </svg>
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        {/* chat */}

        <div
          id="messages"
          className="flex flex-col overflow-scroll  space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
        >
          {/* Write Massage  */}
          <div>
            {
              chatMessage
                ? chatMessage.map((message, index) => {
                    const sender = message?.sender;

                    if (message.data[0] !== secUser) {
                      return (
                        <div className="chat-message" key={index}>
                          <div className="flex items-end justify-end">
                            <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                              <div>
                                <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white">
                                  {message?.content}
                                </span>
                              </div>
                            </div>
                            <img
                              src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
                              alt="My profile"
                              className="w-6 h-6 rounded-full order-2"
                            />
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <div className="chat-message" key={index}>
                          <div className="flex items-end">
                            <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                              <div>
                                <span className="px-4 py-2 rounded-lg inline-block bg-gray-300 text-gray-600">
                                  {message?.content}
                                </span>
                              </div>
                            </div>
                            <img
                              src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
                              alt="My profile"
                              className="w-6 h-6 rounded-full order-1"
                            />
                          </div>
                        </div>
                      );
                    }
                  })
                : null /* Render null if allMessages is not yet available */
            }
          </div>

          <form onSubmit={sendMassage}>
            <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
              <div className="relative flex">
                <span className="absolute inset-y-0 flex items-center">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-6 w-6 text-gray-600"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                      ></path>
                    </svg>
                  </button>
                </span>
                <textarea
                  type="text"
                  name="massage"
                  placeholder="Write your message!"
                  className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3"
                />

                <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-6 w-6 text-gray-600"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                      ></path>
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-6 w-6 text-gray-600"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                      ></path>
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-6 w-6 text-gray-600"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </button>
                  <button
                    type="submit"
                    onClick={() => setx(!x)}
                    className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
                  >
                    <span className="font-bold">Send</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-6 w-6 ml-2 transform rotate-90"
                    >
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatBabbule;
