import Testimonials from "../../Component/Testemonial/Testimonials";
import Banner from "./Banner";
import { Statistic } from "./UserStatics";


const Home = () => {
    return (
        <div className="bg-gradient-to-br from-rose-100 to-teal-100">
            <Statistic></Statistic>
            <Banner></Banner>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;