import { useState } from "react";
import "./UserStatics.css";
import ReactApexChart from "react-apexcharts";

const UserStatics = () => {
  const [state, setState] = useState({
    series: [
      {
        name: "Monthly User",
        data: [31, 40, 28, 51, 95, 85],
      },
    ],
    options: {
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
        categories: ["Jan", "Fab", "Apr", "May", "Jun", "July"],
      },
      tooltip: {
        x: {
          format: "Monthly",
        },
      },
      //   fill: {
      //     colors: ["#F44336", "#E91E63", "#9C27B0"],
      //   },
      dataLabels: {
        style: {
          colors: ["#E621C9", "#E621C9", "#9C27B0"],
        },
      },
      markers: {
        colors: ["#F44336", "#E91E63", "#FFBF83"],
      },
      // grid: {
      //   row: {
      //     colors: ["#F44336", "#E91E63", "#9C27B0"],
      //   },
      //   column: {
      //     colors: ["#F44336", "#E91E63", "#9C27B0"],
      //   },
      // },
    },
    /*  */
  });

  return (
    <div className=" px-4 py-16 mx-auto  md:px-24 lg:px-32 lg:py-20">
      <div className="grid gap-5 row-gap-8 lg:grid-cols-2">
        <div className="flex flex-col justify-center">
          <div className="max-w-xl mb-6">
            <div>
              <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
                Assalamuwlaicum
              </p>
            </div>
            <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
              LAst 6 month our user analytics
              <br className="hidden md:block" />
              that you{" "}
              <span className="inline-block text-deep-purple-accent-400">
                will love
              </span>
            </h2>
            <p className="text-base text-gray-700 md:text-lg">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae. explicabo.
            </p>
          </div>
          <a
            href="/"
            aria-label=""
            className="inline-flex items-center font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
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
            <h2>Registration</h2>
            <p>Month-to-month Comparison</p>
            <div className="pulse"></div>
            <div className="chart-area relative">
              <div className="grid2 "></div>
              <ReactApexChart
                options={state.options}
                series={state.series}
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
