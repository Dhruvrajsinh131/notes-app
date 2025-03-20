import React, { useState } from "react";

interface CardDataProps {
  title: string;
  content: string;
  id: string;
  status: "P" | "C";
  deleteNoteFun: () => void;
}

const Card = (props: CardDataProps) => {
  const { id, title, content, status, deleteNoteFun } = props;
  const [isEditable, setisEditable] = useState(false);
  const [cardData, setCardData] = useState({
    title: title,
    content: content,
    status: status,
  });

  const bgStatusColor = status === "P" ? "#FFA500" : "#28A745";

  const updateNote = async () => {
    console.log("content", content);

    try {
      const updateResp = await fetch(
        `http://localhost:9090/api/notes/update/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ content: cardData.content }),
        }
      );

      const updateRespJson = await updateResp.json();
      console.log("updateRespJson", updateRespJson);
    } catch (error) {}
  };

  return (
    <div className="max-w-sm p-6 bg-white text-ellipsis overflow-hidden text-nowrap border border-gray-200 rounded-lg shadow-sm w-[33%] ">
      <div>
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
          {cardData.title}
        </h5>
      </div>
      {isEditable ? (
        <textarea
          defaultValue={cardData.content}
          onChange={(e) => {
            setCardData((prev) => ({ ...prev, content: e.target.value }));
          }}
        />
      ) : (
        <p
          title={cardData.content || ""}
          className="mb-3 font-normal text-gray-700 text-ellipsis overflow-hidden text-nowrap dark:text-gray-400"
        >
          {cardData.content}
        </p>
      )}
      <div
        className={`inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[${bgStatusColor}] rounded-lg cursor-pointer `}
      >
        {cardData.status}
      </div>

      <button
        onClick={async () => {
          setisEditable(!isEditable);

          if (isEditable) {
            await updateNote();
          }
        }}
      >
        {!isEditable ? `Edit` : `Save`}
      </button>

      <button
        className="bg-blue-600 text-white p-2 cursor-pointer rounded-xl"
        onClick={async () => {
          await deleteNoteFun(id);
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default Card;
