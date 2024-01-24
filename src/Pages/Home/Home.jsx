import { Helmet } from "react-helmet-async";
import Testimonials from "../../Component/Testemonial/Testimonials";
import Banner from "./Banner";
import { Statistic } from "./UserStatics";
import { Faq } from "../../Component/FAQ/Faq";
// import Feedback from "../../Component/Feedback/Feedback";

const Home = () => {
  return (
    <div className="bg-gradient-to-br from-rose-100 to-teal-100">
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Banner></Banner>
      <Statistic></Statistic>
      <Testimonials></Testimonials>
      <Faq></Faq>
    </div>
  );
};

export default Home;