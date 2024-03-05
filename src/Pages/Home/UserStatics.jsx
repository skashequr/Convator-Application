import { useEffect, useState } from "react";
import "./UserStatics.css";
import ReactApexChart from "react-apexcharts";
import useUsers from "../../Hooks/useUser";

const UserStatics = () => {
  const [users] = useUsers();
  // const currentDate = new Date();
  const currentMonth = new Date().getMonth();
  const [valuesForLastSixMonths, setValuesForLastSixMonths] = useState([]);
  const [lastSixMonths, setLastSixMonths] = useState([]);
  // console.log(users.length, "users.length");

  // const [January, setJanuary] = useState(0);
  // const [February, setFebruary] = useState(0);
  // const [March, setMarch] = useState(0);
  // const [April, setApril] = useState(0);
  // const [May, setMay] = useState(0);
  // const [June, setJune] = useState(0);
  // const [July, setJuly] = useState(0);
  // const [August, setAugust] = useState(0);
  // const [September, setSeptember] = useState(0);
  // const [October, setOctober] = useState(0);
  // const [November, setNovember] = useState(0);
  // const [December, setDecember] = useState(0);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    const countsByMonth = {
      January: 0,
      February: 0,
      March: 0,
      April: 0,
      May: 0,
      June: 0,
      July: 0,
      August: 0,
      September: 0,
      October: 0,
      November: 0,
      December: 0,
    };

    users?.forEach((user) => {
      countsByMonth[user.month] += 1;
    });

    // setJanuary(countsByMonth.January);
    // setFebruary(countsByMonth.February);
    // setMarch(countsByMonth.March);
    // setApril(countsByMonth.April);
    // setMay(countsByMonth.May);
    // setJune(countsByMonth.June);
    // setJuly(countsByMonth.July);
    // setAugust(countsByMonth.August);
    // setSeptember(countsByMonth.September);
    // setOctober(countsByMonth.October);
    // setNovember(countsByMonth.November);
    // setDecember(countsByMonth.December);

    const lastSixMonthsArray = [];
    for (let i = 5; i >= 0; i--) {
      const monthIndex = (currentMonth - i + 12) % 12;
      lastSixMonthsArray.push(monthNames[monthIndex].substring(0, 3));
    }
    setLastSixMonths(lastSixMonthsArray);

    const valuesForLastSixMonthsArray = [];
    for (let i = 5; i >= 0; i--) {
      const monthIndex = (currentMonth - i + 12) % 12;
      valuesForLastSixMonthsArray.push(countsByMonth[monthNames[monthIndex]]);
    }
    setValuesForLastSixMonths(valuesForLastSixMonthsArray);
  }, [users]);

  const options = {
    chart: {
      height: 350,
      type: "area",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      categories: lastSixMonths,
    },
    tooltip: {
      x: {
        format: "Monthly",
      },
    },
    dataLabels: {
      style: {
        colors: ["#E621C9", "#E621C9", "#9C27B0"],
      },
    },
    markers: {
      colors: ["#F44336", "#E91E63", "#FFBF83"],
    },
  };

  const series = [
    {
      name: "Monthly User",
      data: valuesForLastSixMonths,
    },
  ];

  return (
    <div className=" px-4 py-16 mx-auto  md:px-24 lg:px-32 lg:py-20">
      <div className="grid gap-5 row-gap-8 lg:grid-cols-2">
        <div className="flex flex-col justify-center">
          <div className="max-w-xl mb-6">
            <div>
              <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-titleColor uppercase rounded-full bg-teal-accent-400">
                Assalamuwlaicum
              </p>
            </div>
            <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-titleColor sm:text-4xl sm:leading-none">
              Last 6 month our user analytics
              <br className="hidden md:block" />
              that you{" "}
              <span className="inline-block text-deep-purple-accent-400">
                will love
              </span>
            </h2>
            <p className="text-base text-textColor md:text-lg">
              Number of active users: This indicates the total number of users
              who have engaged with your product or service within a specific
              time frame, such as the last 6 months
            </p>
          </div>
          <a
            href="/"
            aria-label=""
            className="inline-flex items-center font-semibold transition-colors duration-200 text-btnTextColor "
          >
            Learn more
            <svg
              className="inline-block w-3 ml-2"
              fill="currentColor"
              viewBox="0 0 12 12"
            >
              <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z" />
            </svg>
          </a>
        </div>
        <div className="relative flex justify-center items-center">
          <div id="chart" className="card lg:w-[800px] md:w-[600px]">
            <h2 className="text-titleColor">Registration</h2>
            <p className="text-textColor">Month-to-month Comparison</p>
            <div className="pulse"></div>
            <div className="chart-area relative text-titleColor">
              <div className="grid2 "></div>
              <ReactApexChart
                options={options}
                series={series}
                type="area"
                height={350}
                // width={100%}
              />
            </div>
          </div>
          <div id="html-dist"></div>
        </div>
      </div>
    </div>
  );
};

export default UserStatics;
