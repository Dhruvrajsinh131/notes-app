import React from "react";
import Card from "../Card";

const List = ({ data, deleteNoteFun }) => {
  return (
    <>
      {" "}
      {data && data?.length
        ? data.map((val) => (
            <Card
              key={val._id}
              deleteNoteFun={deleteNoteFun}
              id={val._id}
              title={val.title}
              content={val.content}
              status={val.status}
            />
          ))
        : "Notes does Not Found"}
    </>
  );
};

export default List;
