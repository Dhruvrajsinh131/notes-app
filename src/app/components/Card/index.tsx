import React from "react";

interface CardDataProps {
  title: String;
  content: String;
  status: "P" | "C";
}

const Card = (props: CardDataProps) => {
  const { title, content, status } = props;

  const bgStatusColor = status === "P" ? "#FFA500" : "#28A745";

  return (
    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm w-[33%]">
      <div>
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
          {title}
        </h5>
      </div>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        {content}
      </p>
      <div
        className={`inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[${bgStatusColor}] rounded-lg cursor-pointer `}
      >
        {status}
      </div>
    </div>
  );
};

export default Card;
