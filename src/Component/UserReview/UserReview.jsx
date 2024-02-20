import React, { useContext, useEffect, useState } from "react";
import "./UserReview.css";
import { AuthContext } from "../../Pages/Authentication/AuthProvider/Authprovider";
import useUsers from "../../Hooks/useUser";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAllReviews from "../../Hooks/useAllReviews";

const UserReview = () => {
  const { mode, user } = useContext(AuthContext);
  const [users] = useUsers();
  const [currentUser, setCurrentUser] = useState();
  const [inputValue, setInputValue] = useState("");
  const axiosPublic = useAxiosPublic();
  const [reload] = useAllReviews();
  // console.log(user);
  useEffect(() => {
    const currentUser = users?.filter(
      (matchUser) => matchUser?.email === user?.email
    );
    setCurrentUser(currentUser[0]);
  }, [user, users]);
  // console.log(currentUser, "currentUser");

  const handleChange = (event) => {
    const Value = event.target.value;
    setInputValue(Value);
  };

  const handleReview = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // console.log(inputValue, "inputValue"); // Log the comment value
    // console.log(currentUser, "currentUser"); // Log the comment value
    setInputValue("");
    const reviewsData = {
      name: currentUser?.name,
      email: currentUser?.email,
      imageUrl: currentUser?.imageUrl,
      comment: inputValue,
    };
    console.log(reviewsData, "reviewsData");
    axiosPublic
      .post("/users-review", reviewsData)
      .then((res) => {
        // console.log(res);
        reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <section className=" bg-slate-500 dark:text-gray-50">
        <form
          onSubmit={handleReview}
          action=""
          className="container flex flex-col mx-auto space-y-12"
        >
          <fieldset className="flex flex-col justify-center items-center gap-6 p-6 rounded-md shadow-sm dark:bg-gray-900">
            <div className="space-y-2 col-span-full lg:col-span-1">
              <div className="flex flex-col justify-center max-w-xs p-6 shadow-md rounded-xl sm:px-12 dark:bg-gray-900 dark:text-gray-100">
                <img
                  src={currentUser?.imageUrl}
                  alt=""
                  className="w-32 h-32 mx-auto rounded-full dark:bg-gray-500 aspect-square"
                />
                <div className="space-y-4 text-center divide-y dark:divide-gray-700">
                  <div className="my-2 space-y-1">
                    <h2 className="text-xl font-semibold sm:text-2xl">
                      {currentUser?.name}
                    </h2>
                    <p className="px-5 text-xs sm:text-base dark:text-gray-400">
                      {currentUser?.email}
                    </p>
                  </div>
                  <div className="flex justify-center pt-2 space-x-4 align-center"></div>
                </div>
              </div>
            </div>
            <div className="w-full">
              <div className="">
                <label htmlFor="comment" className="text-sm">
                  Comment
                </label>
                <textarea
                  id="bio"
                  name="comment"
                  placeholder=""
                  value={inputValue}
                  onChange={handleChange}
                  className="w-full bg-cyan-400 rounded-md focus:ring focus:ri focus:ri dark:border-gray-400 dark:text-gray-900"
                ></textarea>
              </div>
            </div>
          </fieldset>
          {mode ? (
            <button class="bn632-hover bn20 w-full">Button</button>
          ) : (
            <button className="btn41-43 btn-41 ">Button</button>
          )}
        </form>
      </section>
    </div>
  );
};

export default UserReview;
