import React from "react";
import OneCard from "./OneCard";

const AccessCard = () => {
  const cards = [
    {
      plan: "Basic Plan",
      price_per_month: 19,
      access_limit: "5 days",
      plan_id: "34564fasfas"
    },
    {
      plan: "Standard Plan",
      price_per_month: 49,
      access_limit: "10 days",
      plan_id: "345asdf64fasfas"
    },
    {
      plan: "Premium Plan",
      price_per_month: 99,
      access_limit: "1 Year",
      plan_id: "3uy54564fasfas"
    },
  ];
  return (
    <div className="flex flex-wrap justify-between mx-32">
      {cards.map((card, idx) => (
        <OneCard key={idx} card={card}></OneCard>
      ))}
    </div>
  );
};

export default AccessCard;
