import React, { useState } from "react";

interface CardDataProps {
  title: String;
  content: String;
  status: "P" | "C";
}

const Card = (props: CardDataProps) => {
  const { title, content, status } = props;
  const [isEditable, setisEditable] = useState(false);
  const [cardData, setCardData] = useState({
    title: title,
    content: content,
    status: status,
  });

  const bgStatusColor = status === "P" ? "#FFA500" : "#28A745";

  const updateNote = async () => {};

  return (
    <div className="max-w-sm p-6 bg-white text-ellipsis overflow-hidden text-nowrap border border-gray-200 rounded-lg shadow-sm w-[33%] ">
      <div>
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
          {title}
        </h5>
      </div>
      {isEditable ? (
        <textarea
          defaultValue={content}
          onChange={(e) => {
            setCardData((prev) => ({ ...prev, content: e.target.value }));
          }}
        />
      ) : (
        <p
          title={content || ""}
          className="mb-3 font-normal text-gray-700 text-ellipsis overflow-hidden text-nowrap dark:text-gray-400"
        >
          {content}
        </p>
      )}
      <div
        className={`inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[${bgStatusColor}] rounded-lg cursor-pointer `}
      >
        {status}
      </div>

      <button
        onClick={async () => {
          console.log("cardData", cardData);

          setisEditable(!isEditable);

          if (isEditable) {
            await updateNote();
          }
        }}
      >
        {!isEditable ? `Edit` : `Save`}
      </button>
    </div>
  );
};

export default Card;
