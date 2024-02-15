import { Helmet } from "react-helmet-async";
import Testimonials from "../../Component/Testemonial/Testimonials";
import Banner from "./Banner";
import UserStatics from "./UserStatics";
import { Faq } from "../../Component/FAQ/Faq";
import MultiHexon from "../Hexagon-card/multihexon/multicard";
import { useContext } from "react";
import { AuthContext } from "../Authentication/AuthProvider/Authprovider";
import AccessCard from "../../Component/AccessCard/AccessCard";

const Home = () => {
  return (
    <div>
      <div>
        <Helmet>
          <title>Home</title>
        </Helmet>
        <Banner></Banner>
        <UserStatics></UserStatics>
        <MultiHexon></MultiHexon>
        <Testimonials></Testimonials>
        <AccessCard></AccessCard>
        <Faq></Faq>
      </div>
    </div>
  );
};

export default Home;
