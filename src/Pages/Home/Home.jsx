import { Helmet } from "react-helmet-async";
import Testimonials from "../../Component/Testemonial/Testimonials";
import Banner from "./Banner";
import UserStatics from "./UserStatics";
import { Faq } from "../../Component/FAQ/Faq";
import Hexagon from "../Hexagon-card/Hexagon";
import MultiHexon from "../Hexagon-card/multihexon/multicard";

// import Feedback from "../../Component/Feedback/Feedback";

const Home = () => {
  return (
    <div className="bg-gradient-to-br from-rose-100 to-teal-100 mx-auto">
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Banner></Banner>
      <UserStatics></UserStatics>
      <div className="mt-5">
        <MultiHexon></MultiHexon>
      </div>
      <Testimonials></Testimonials>

      <Faq></Faq>
    </div>
  );
};

export default Home;
