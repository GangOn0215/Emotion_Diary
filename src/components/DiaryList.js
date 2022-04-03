import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';
import DiaryItem from "./DiaryItem";
import MyButton from './MyButton';

const ControlMenu = ({ value, onChange, optionList, callback }) => {
  return (
    <select 
      className="ControlMenu" 
      value={value} 
      onChange={(e) => {
        if(['daily', 'weekly', 'monthly'].includes(value)) {
          callback(value);
        }

        onChange(e.target.value);
      }}
    >
      {optionList.map((item, idx) => 
        <option key={idx} value={item.value}>
          {item.name}
        </option>
      )}
    </select>
  )
};

// periodicity: 주기적 일정한 간격
// daily, weekly, monthly, yearly
const periodicityOptionList = [
  {value: "daily", name: "일간"},
  {value: "weekly",  name: "주간"},
  {value: "monthly", name: "월간"},
];

const sortOptionList = [
  {value: "latest", name: "최신순"},
  {value: "oldest", name: "오래된 순"},
];

const filterOptionList = [
  {value: "all",  name: "전부다"},
  {value: "good", name: "좋은 감정만"},
  {value: "bad",  name: "안좋은 감정만"},
];

const DiaryList = ({ diaryList, periodicity, setPeriodicity }) => {
  console.log(diaryList);
  const navigate = useNavigate();
  // const [periodicity, setPeriodicity] = useState("weekly");
  const [sortType, setSortType]       = useState("latest");
  const [filter, setFilter]           = useState("all");

  // const onChangePeriodicity = () => {
  //   console.log('break');
  //   setTogglePeriodicity(!togglePeriodicity);
  // }

  const getProcessDiaryList = () => {
    const filterCallBack = (item) => {
      if(filter === 'good') {
        return parseInt(item.emotion) <= 3;
      } else {
        return parseInt(item.emotion) > 3;
      }
    }

    const compare = (a, b) => {
      if(sortType === 'latest') {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    }

    // const copyList = JSON.parse(JSON.stringify(diaryList));
    const copyList = [...diaryList]; // immutability

    const filteredList = (filter === 'all') ? copyList : copyList.filter((item)=> filterCallBack(item));
    const sortedList = filteredList.sort(compare);

    return sortedList;
  }

  return (
    <div className="DiaryList">
      <div className="menu-wrapper">
        <div className="left-col">
          <ControlMenu 
            value={periodicity}
            onChange={setPeriodicity}
            optionList={periodicityOptionList}
            // callback={onChangePeriodicity}
          />
          <ControlMenu 
            value={sortType} 
            onChange={setSortType} 
            optionList={sortOptionList}
          />
          <ControlMenu 
            value={filter}
            onChange={setFilter}
            optionList={filterOptionList}
          />
        </div>
        <div className="right-col">
          <MyButton 
            type={'positive'} 
            text={'Write new diary'} 
            onClick={()=>navigate('/new')}
          />
        </div>
      </div>


      {getProcessDiaryList().map((item) => {
        return (<DiaryItem key={item.id} {...item}/>);
      })}
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
