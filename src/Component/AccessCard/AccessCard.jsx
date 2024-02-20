import OneCard from "./OneCard";
import useAccessCard from "../../Hooks/useAccessCard";
import { SyncLoader } from "react-spinners";

const AccessCard = () => {
  const [allAccessCard, reload, isLoading] = useAccessCard();

  // console.log("allAccessCard", allAccessCard);

  return (
    <div className="text-textColor container mx-auto p-4 sm:p-10">
      <div className="mb-16 space-y-4 text-center">
        <h1 className="text-titleColor text-4xl font-semibold leadi">
          SUBSCRIPTION
        </h1>
        <p className="px-4 sm:px-8 lg:px-24">
          Sunt suscipit eaque qui iure unde labore numquam iusto alias
          explicabo, pariatur ipsam, cupiditate aliquid modi?
        </p>
        <div>
          <button className="px-4 py-1 font-semibold border rounded-l-lg dark:bg-violet-400 dark:border-violet-400 dark:text-gray-900">
            Monthly
          </button>
          <button className="px-4 py-1 border rounded-r-lg dark:border-violet-400">
            Annually
          </button>
        </div>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-64 w-full">
          <SyncLoader color="#36d7b7" />
        </div>
      ) : (
        <div className="grid text-AllTitle bg-AllCard max-w-md sm:grid-cols-1 gap-6 auto-rows-fr lg:max-w-full sm:max-w-full lg:gap-2 xl:gap-6 lg:grid-cols-3 mx-32">
          {allAccessCard && allAccessCard.length > 0 ? (
            allAccessCard.map((card, idx) => (
              <OneCard key={idx} card={card}></OneCard>
            ))
          ) : (
            <p>No cards available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AccessCard;
