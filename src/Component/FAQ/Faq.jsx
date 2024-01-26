import { useState } from "react";
export const Faq = () => {
  const [isOpen, setIsOpen] = useState(null);
  const accordions = [
    {
      title: "What does the converter application do?",
      description:
        "he converter application helps users convert one type of data or file format into another. This could include converting units of measurement, file formats, currencies, and more.",
    },
    {
      title: "What types of conversions does the application support?",
      description:
        "The application may support various types of conversions, such as length, weight, temperature, currency, time, and file formats like PDF to Word, image to text, etc.",
    },
    {
      title: "How user-friendly is the application?",
      description:
        "Users often want to know how easy it is to navigate and use the application. Look for an application with a simple and intuitive interface to enhance the user experience.",
    },
    {
      title: "Is there customer support available?",
      description:
        "Check if the converter application has customer support options in case you encounter issues or have questions. This could include email support, live chat, or a knowledge base.",
    },
    {
      title: "How frequently is the application updated?",
      description:
        "Regular updates can indicate that the developers are actively maintaining and improving the application. Ensure that the converter application you choose receives updates to address bugs, add features, and stay current.",
    },
  ];
  const toggle = (idx) => {
    setIsOpen((prevIdx) => (prevIdx === idx ? null : idx));
  };
  return (
    <div className="border  p-6 font-sans mx-4 rounded-xl mt-4 mb-10 bg-white bg-clip-border shadow-md">
      {accordions.map((PerAccordion, idx) => (
        <div key={idx} className="p-4 border-b">
          <button
            onClick={() => toggle(idx)}
            className="  flex justify-between items-center py-4 w-full h-full"
          >
            <span className="text-xl">{PerAccordion.title}</span>
            <svg
              className="fill-[#00A2FF] shrink-0 ml-8"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                y="7"
                width="16"
                height="2"
                rx="1"
                className={`transform origin-center transition duration-200 ease-out ${
                  isOpen === idx && "!rotate-180"
                }`}
              />
              <rect
                y="7"
                width="16"
                height="2"
                rx="1"
                className={`transform origin-center rotate-90 transition duration-200 ease-out ${
                  isOpen === idx && "!rotate-180"
                }`}
              />
            </svg>
          </button>
          <div
            className={`grid overflow-hidden transition-all duration-300 ease-in-out text-slate-600  ${
              isOpen === idx
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">{PerAccordion.description}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
