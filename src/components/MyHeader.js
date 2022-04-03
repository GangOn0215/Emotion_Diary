import React, {useState} from "react";

const MyHeader = ({headText, leftChild, rightChild, periodicity, curDate, setCurDate}) => {
  const [localCurDate, setLocalCurDate] = useState(curDate);
  return (
    <header>
      <div className="head-btn-left">
        {leftChild}
      </div>
      <div className="head-text">
        {headText}
        {
          periodicity === "daily" ?
          <input type="date" className="input-daily-date" value={localCurDate}/> 
          : 
          <></>
        }
      </div>
      <div className="head-btn-right">
        {rightChild}
      </div>
    </header>
  )
}

export default MyHeader;