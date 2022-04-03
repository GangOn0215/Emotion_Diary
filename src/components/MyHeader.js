import React, {useState, forwardRef} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const getStringDate = (date) => {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  if (month < 10) {
    month = `0${month}`;
  }

  if (day < 10) {
    day = `0${day}`;
  }

  return `${year}-${month}-${day}`;
};

const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
  <button className="example-custom-input" onClick={onClick} ref={ref}>
    {value}
  </button>
));

const MyHeader = ({headText, leftChild, rightChild, periodicity, curDate, setCurDate}) => {
  const [localCurDate, setLocalCurDate] = useState(new Date(curDate));

  const [startDate, setStartDate] = useState(new Date(curDate));

  setCurDate(startDate);
  console.log(getStringDate(localCurDate));

  // `${curDate.getFullYear()}-${curDate.getMonth() + 1}-${curDate.getDate()}`

  return (
    <header>
      <div className="head-btn-left">
        {leftChild}
      </div>
      <div className="head-text">
        {/* {headText} */}
        <DatePicker
          selected={startDate}
          onChange={(date) => {
            setStartDate(date);
            setCurDate(date);
          }}
          customInput={<ExampleCustomInput />}
        />
        {/* {
          periodicity === "daily" ?
          <input 
            type="date" 
            className="input-daily-date" 
            value={getStringDate(localCurDate)}
            onChange={(e) => console.log(e.target.value)}
          />
          : 
          <></>
        } */}
      </div>
      <div className="head-btn-right">
        {rightChild}
      </div>
    </header>
  )
}

export default MyHeader;