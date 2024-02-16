import React from "react";
import OneCard from "./OneCard";

const AccessCard = () => {
  const cards = [
    {
      plan: "Basic Plan",
      price_per_month: 19,
      access_limit: "5 days",
      plan_id: "34564fasfas",
    },
    {
      plan: "Standard Plan",
      price_per_month: 49,
      access_limit: "10 days",
      plan_id: "345asdf64fasfas",
    },
    {
      plan: "Premium Plan",
      price_per_month: 99,
      access_limit: "1 Year",
      plan_id: "3uy54564fasfas",
    },
  ];
  return (
    <div className="container mx-auto p-4 sm:p-10">
      <div className="mb-16 space-y-4 text-center">
        <h1 className="text-4xl font-semibold leadi">Pricing</h1>
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
      <div className="grid max-w-md grid-cols-1 gap-6 auto-rows-fr lg:max-w-full lg:gap-2 xl:gap-6 lg:grid-cols-3 mx-32">
        {cards.map((card, idx) => (
          <OneCard key={idx} card={card}></OneCard>
        ))}
      </div>
    </div>
  );
};

export default AccessCard;
