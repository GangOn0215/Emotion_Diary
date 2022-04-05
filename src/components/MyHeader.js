import React, { useState, useEffect, forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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
  <button className='example-custom-input' onClick={onClick} ref={ref}>
    {value}
  </button>
));

const MyHeader = ({ headText, leftChild, rightChild, periodicity, curDate, onChangeDate }) => {
  // const [localCurDate, setLocalCurDate] = useState(new Date(curDate));

  const [startDate, setStartDate] = useState(new Date(curDate));

  useEffect(() => {
    setStartDate(new Date(curDate));
  }, [curDate]);
  // setCurDate(startDate);
  // console.log(getStringDate(localCurDate));

  // `${curDate.getFullYear()}-${curDate.getMonth() + 1}-${curDate.getDate()}`

  return (
    <header>
      <div className='head-btn-left'>{leftChild}</div>
      <div className='head-text'>
        {periodicity === `daily` ? (
          <DatePicker
            selected={startDate}
            onChange={(date) => {
              setStartDate(date);
              onChangeDate(date);
            }}
            customInput={<ExampleCustomInput />}
          />
        ) : (
          headText
        )}
      </div>
      <div className='head-btn-right'>{rightChild}</div>
    </header>
  );
};

export default MyHeader;
