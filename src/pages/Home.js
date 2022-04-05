import React, { useState, useEffect, useContext } from 'react';

/* Components */
import MyHeader from '../components/MyHeader';
import MyButton from '../components/MyButton';
import DiaryList from '../components/DiaryList';

/* Context */
import { DiaryStateContext } from '../App';

// increase, decrease
const indecreasePeriodicity = (periodicity, curDate, onChangeDate) => {
  const switchPeriodicity = periodicity;
  let increase = null;
  let decrease = null;

  switch (switchPeriodicity) {
    case 'daily':
      increase = () =>
        onChangeDate(new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate() + 1));
      decrease = () =>
        onChangeDate(new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate() - 1));
      break;
    case 'weekly':
      increase = () =>
        onChangeDate(new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate() + 7));
      decrease = () =>
        onChangeDate(new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate() - 7));
      break;
    case 'monthly':
      increase = () => onChangeDate(new Date(curDate.getFullYear(), curDate.getMonth() + 1));
      decrease = () => onChangeDate(new Date(curDate.getFullYear(), curDate.getMonth() - 1));
      break;
    default:
      break;
  }

  return { increase, decrease };
};

const SetHeader = ({ periodicity, headTextOBJ, curDate, onChangeDate }) => {
  let headText = null;

  const { increase, decrease } = indecreasePeriodicity(periodicity, curDate, onChangeDate);

  switch (periodicity) {
    case 'diary':
      headText = headTextOBJ.dailyText;
      break;
    case 'weekly':
      headText = headTextOBJ.weeklyText;
      break;
    case 'monthly':
      headText = headTextOBJ.monthlyText;
      break;
    default:
      headText = headTextOBJ.dailyText;
      break;
  }

  return (
    <MyHeader
      headText={headText}
      leftChild={<MyButton text={'<'} onClick={decrease} />}
      rightChild={<MyButton text={'>'} onClick={increase} />}
      periodicity={periodicity}
      curDate={curDate}
      onChangeDate={onChangeDate}
    />
  );
};

const Home = () => {
  const diaryLists = useContext(DiaryStateContext);

  const [data, setData] = useState([]);
  const [curDate, setCurDate] = useState(new Date(2022, 2, 31, 15, 30, 0));
  const [weeklyDate, setWeeklyDate] = useState({
    first: null,
    last: null,
  });

  const [periodicity, setPeriodicity] = useState('daily');
  const headTextOBJ = {
    dailyText: `${curDate.getMonth() + 1} 월 ${curDate.getDate()} 일`,
    weeklyText: weeklyDate.first
      ? `${weeklyDate.first.getMonth() + 1} 월 ${weeklyDate.first.getDate()} 일 ~ ${
          weeklyDate.last.getMonth() + 1
        }  월 ${weeklyDate.last.getDate()} 일`
      : null,
    monthlyText: `${curDate.getFullYear()} 년 ${curDate.getMonth() + 1} 월`,
  };

  const getDailyFirstLastTime = () => {
    const dailyDate = curDate;
    let firstDay = new Date(
      dailyDate.getFullYear(),
      dailyDate.getMonth(),
      dailyDate.getDate(),
      0,
      0,
      0,
    );
    let lastDay = new Date(
      dailyDate.getFullYear(),
      dailyDate.getMonth(),
      dailyDate.getDate(),
      23,
      59,
      59,
    ).getTime();

    return { firstDay, lastDay };
  };

  // Start Monday
  const getWeeklyFirstLastDay = (startMonday = false) => {
    console.log('break');
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
      todayDate.getDate() - subDay,
    ).getTime();

    lastDay = new Date(
      todayDate.getFullYear(),
      todayDate.getMonth(),
      todayDate.getDate() + (6 - subDay),
      23,
      59,
      59,
    ).getTime();

    setWeeklyDate({
      first: new Date(firstDay),
      last: new Date(lastDay),
    });

    return { firstDay, lastDay };
  };

  const getMonthlyFirstLastDay = () => {
    const firstDay = new Date(curDate.getFullYear(), curDate.getMonth(), 1).getTime();

    const lastDay = new Date(
      curDate.getFullYear(),
      curDate.getMonth() + 1,
      0,
      23,
      59,
      59,
    ).getTime();

    return { firstDay, lastDay };
  };

  const handleChangePeriodicity = (changePeriodicity) => {
    setCurDate(new Date(2022, 2, 31, 15, 30, 0));
    setPeriodicity(changePeriodicity);
  };

  const onChangeDate = (newDate) => {
    setCurDate(newDate);
  };

  useEffect(() => {
    if (diaryLists.length < 1) {
      return;
    }

    let firstLastCallback = null;

    switch (periodicity) {
      case 'daily':
        firstLastCallback = getDailyFirstLastTime;
        break;
      case 'weekly':
        firstLastCallback = getWeeklyFirstLastDay;
        break;
      case 'monthly':
        firstLastCallback = getMonthlyFirstLastDay;
        break;
      default:
        firstLastCallback = getMonthlyFirstLastDay;
        break;
    }

    // const { first, last } = firstLastCallback();
    const { firstDay, lastDay } = firstLastCallback();

    setData(diaryLists.filter((item) => firstDay <= item.date && item.date <= lastDay));

    console.log(diaryLists.filter((item) => firstDay <= item.date && item.date <= lastDay));
  }, [diaryLists, curDate, periodicity]);

  return (
    <div className='Diary'>
      <SetHeader
        periodicity={periodicity}
        headTextOBJ={headTextOBJ}
        curDate={curDate}
        onChangeDate={onChangeDate}
      />

      <DiaryList
        diaryList={data}
        periodicity={periodicity}
        setPeriodicity={handleChangePeriodicity}
      />
    </div>
  );
};

export default Home;
