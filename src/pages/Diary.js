import React from "react";
import { useParams } from "react-router-dom";

const Diary = () => {
  const { id } = useParams();
  console.log(id);

  return (
    <div className="Diary">
      <h1>Diary</h1>
      <p>this Diary page</p>
    </div>
  );
};

export default Diary;
