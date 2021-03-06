import React, { useState, useEffect, forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
  <button className='example-custom-input' onClick={onClick} ref={ref}>
    {value}
  </button>
));

const MyHeader = ({
  headText,
  leftChild,
  rightChild,
  periodicity = null,
  curDate,
  onChangeDate,
}) => {
  const [startDate, setStartDate] = useState(new Date(curDate));

  useEffect(() => {
    setStartDate(new Date(curDate));
  }, [curDate]);

  return (
    <header>
      <div className='head-btn-left'>{leftChild}</div>

      <div className='head-text'>
        {periodicity === 'daily' ? (
          <DatePicker
            selected={startDate}
            onChange={(date) => {
              setStartDate(date);
              onChangeDate(date);
            }}
            className='date-picker'
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
