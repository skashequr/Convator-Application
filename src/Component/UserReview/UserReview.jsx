import { useContext, useEffect, useState } from "react";
// import "./UserReview.css";
import { AuthContext } from "../../Pages/Authentication/AuthProvider/Authprovider";
import useUsers from "../../Hooks/useUser";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAllReviews from "../../Hooks/useAllReviews";
import { Button } from "flowbite-react";

const UserReview = () => {
  const { mode, user } = useContext(AuthContext);
  const [users] = useUsers();
  const [currentUser, setCurrentUser] = useState();
  const [inputValue, setInputValue] = useState("");
  const axiosPublic = useAxiosPublic();
  const [, reload] = useAllReviews();
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
        reload();
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="shadow-2xl">
      <section className="bg-AllCard text-AllTitle">
        <form
          onSubmit={handleReview}
          action=""
          className="container flex flex-col mx-auto space-y-12"
        >
          <fieldset className="flex flex-col border-s-green-50 justify-center items-center gap-4 p-6 rounded-md shadow-sm ">
            <div className="space-y-2 col-span-full lg:col-span-1 ">
              <div className="flex flex-col  justify-center max-w-xs p-6 shadow-2xl rounded-xl sm:px-12">
                <img
                  src={currentUser?.imageUrl}
                  alt=""
                  className="w-32 h-32 mx-auto rounded-full "
                />
                <div className="space-y-4 text-center divide-y ">
                  <div className="my-2 space-y-1">
                    <h2 className="text-xl font-semibold sm:text-2xl">
                      {currentUser?.name}
                    </h2>
                    <p className="px-5 text-xs sm:text-base">
                      {currentUser?.email}
                    </p>
                  </div>
                  <div className="flex justify-center pt-2 space-x-4 align-center"></div>
                </div>
              </div>
            </div>
            {/* <div className="w-full p-3 shadow-md">
              <label htmlFor="comment" className="text-sm">
                Comment Now:-
              </label>
              <textarea
                id="bio"
                name="comment"
                placeholder=""
                value={inputValue}
                onChange={handleChange}
                className="w-full  rounded-md focus:ring focus:ri focus:ri"
              ></textarea>

              {mode ? (
                <Button color="info"> Post Now</Button>
              ) : (
                <Button color="info"> Post Now</Button>
              )}
            </div>
          </fieldset>
        </form> */}
            <div className="w-full p-4 shadow-md">
              <div className="">
                <label htmlFor="comment" className="text-sm ">
                  Comment
                </label>
                <textarea
                  id="bio"
                  name="comment"
                  placeholder="write something here"
                  value={inputValue}
                  onChange={handleChange}
                  className="w-full p-3 text-AllTitle bg-AllCard shadow-2xl rounded-md focus:ring focus:ri focus:ri border-dashed border-2 border-sky-500 "
                ></textarea>
              </div>
            </div>
          </fieldset>
          {mode ? (
            <button className="bn632-hover bn20 w-full">Post</button>
          ) : (
            <button className="bn632-hover bn20 w-full ">Post</button>
          )}
        </form>
      </section>
    </div>
  );
};

export default UserReview;
