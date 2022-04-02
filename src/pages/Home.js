import React, { useState, useEffect, useContext } from "react";

/* Components */
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import DiaryList from "../components/DiaryList";

/* Context */
import { DiaryStateContext } from "../App";

const Home = () => {
  const diaryLists = useContext(DiaryStateContext);

  const [data, setData] = useState([]);
  const [curDate, setCurDate] = useState(new Date(2022, 2, 31, 15, 30, 0));
  const [weeklyDate, setWeeklyDate] = useState({
    first: null,
    last: null
  });
  // true: weekly false: monthly
  const [togglePeriodicity, setTogglePeriodicity] = useState(true);

  const MonthlyText = `${curDate.getFullYear()} 년 ${curDate.getMonth() + 1} 월`;
  let weeklyText = weeklyDate.first ?
    (`${weeklyDate.first.getMonth() + 1} 월 ${weeklyDate.first.getDate()} 일 ~ ${weeklyDate.last.getMonth() + 1}  월 ${weeklyDate.last.getDate()} 일` ) : null;

  // Start Monday
  const getWeeklyFirstLastDay = (startMonday = false) => {
    const todayDate = curDate;
    let firstDay = null;
    let lastDay = null;
    let subDay = todayDate.getDay() - (startMonday ? 1 : 0);

    if (todayDate.getDay() === 0) {
      subDay = 6;
    }

    firstDay = new Date(
      todayDate.getFullYear(),
      todayDate.getMonth(),
      todayDate.getDate() - subDay
    ).getTime();

    lastDay = new Date(
      todayDate.getFullYear(),
      todayDate.getMonth(),
      todayDate.getDate() + (6 - subDay),
      23,
      59,
      59
    );

    setWeeklyDate({
      first: new Date(firstDay),
      last: new Date(lastDay),
    });

    return { firstDay, lastDay };
  };

  const getMonthlyFirstLastDay = () => {
    const firstDay = new Date(
      curDate.getFullYear(),
      curDate.getMonth(),
      1
    ).getTime();

    const lastDay = new Date(
      curDate.getFullYear(),
      curDate.getMonth() + 1,
      0,
      23,
      59,
      59
    ).getTime();

    return { firstDay, lastDay };
  };

  useEffect(() => {
  });

  useEffect(() => {
    if (diaryLists.length < 1) {
      return;
    }

    const { firstDay, lastDay } = togglePeriodicity ? getWeeklyFirstLastDay() : getMonthlyFirstLastDay()

    setData(
      diaryLists.filter((item) => firstDay <= item.date && item.date <= lastDay)
    );
  }, [diaryLists, curDate]);

  // 처음 Mount 할때 실행이 됩니다. []
  useEffect(() => {
    // console.log(data);
  }, [data]);

  const increaseMonth = () => {
    setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() + 1));
  };

  const decreaseMonth = () => {
    setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() - 1));
  };

  const increaseWeekly = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate() + 7)
    );
  };

  const decreaseWeekly = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate() - 7)
    );
  };

  return (
    <div className="Diary">
      { togglePeriodicity ? 
        <>
          <MyHeader
            headText={weeklyText}
            leftChild={<MyButton text={"<"} onClick={decreaseWeekly} />}
            rightChild={<MyButton text={">"} onClick={increaseWeekly} />}
          />
        </>
        :
        <>
          <MyHeader
            headText={MonthlyText}
            leftChild={<MyButton text={"<"} onClick={decreaseMonth} />}
            rightChild={<MyButton text={">"} onClick={increaseMonth} />}
          />
        </>

      }
      <DiaryList 
        diaryList={data} 
        togglePeriodicity={togglePeriodicity}
        setTogglePeriodicity={setTogglePeriodicity}
      />
    </div>
  );
};

export default Home;
